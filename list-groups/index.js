/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const config = require('./../config');
const amqp = require('amqplib/callback_api');

/**
 * list-groups
 *
 * @returns none
 */
function listGroups() {
    console.log("list-groups");

    const connParams = config.getConnParams();
    const rmqSettings = config.getRmqSettings();


    // create a random request ID (make it 32 bit)
    const requestId = Math.round(Math.random() * 0xFFFFFFFF);

    //
    // The Group API is documented here!
    //   https://github.com/Avimesa/user-guide-group-api-amqp#4.2-group-api
    //
    const msg = {
        "api_maj": 0,
        "api_min": 11,
        "cmd_id": 102,
        "req_id": requestId
    };

    console.log('Sending the following message to admin.dx exchange: ' + JSON.stringify(msg));

    const exchangeName = rmqSettings.exchanges.admin;
    const routingKey = rmqSettings.routingKeys.admin_in;

    // Connect to the server
    amqp.connect(connParams, function(err, conn) {
        if(err){
            console.log(err);
        }
        else{
            // Use a 'confirm channel' here so we can use callbacks on publishing
            conn.createConfirmChannel(function(err, ch) {
                if (err){
                    console.log(err);
                    conn.close();
                }
                else {
                    // Get a correlation ID used to allow 'multi-tenancy' RPC users
                    const correlationId = requestId.toString();

                    //
                    // Create a temporary queue which will end up getting the response from our admin command.
                    // Exclusive so only a single client can use it, expiration time to handle client side issues,
                    // and auto delete to clean up normally after use
                    //
                    ch.assertQueue('', {exclusive:true, expires: 60000, autoDelete : true}, function(err, q){
                        if(err){
                            console.log(err.message);
                            conn.close();
                        } else {

                            // Subscribe to this queue so we get the response
                            ch.consume(q.queue, function(msg) {

                                // Is this the response we're looking for?
                                if (msg.properties.correlationId === correlationId){
                                    var cmd = JSON.parse(msg.content.toString());
                                    if (!cmd.response.error){
                                        for (var i = 0; i < cmd.response.message.groups.length; i++){
                                            console.log(cmd.response.message.groups[i]);
                                        }
                                    }

                                    // this was our request, so ack it!
                                    ch.ack(msg);

                                    // we're done for this example
                                    conn.close();
                                }
                            }, {noAck: false}); // we'll give an ack once we get the message

                            //
                            // Pass in the queue's name that we created above, to be extra safe throw in a correlation ID
                            // that we can use to track the response
                            //
                            const options =  {
                                replyTo : q.queue,
                                correlationId : correlationId,
                            };

                            ch.publish(exchangeName, routingKey, new Buffer(JSON.stringify(msg)),options, function (err, ok) {
                                if (err){
                                    console.log(err.message);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

listGroups();
