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
 * queue-temp-subscriber example
 *
 * @returns none
 */
function accountingRecords(){
    console.log("accounting-records");

    const connParams = config.getConnParams();
    const rmqSettings = config.getRmqSettings();

    connParams.vhost = "infrastructure";
    connParams.username = "TODO";
    connParams.password = "TODO";

    const exchangeName = rmqSettings.exchanges.data;
    const routingKey = rmqSettings.routingKeys.raw;

    // Connect to the server
    amqp.connect(connParams, function(err, conn) {
        if (err){
            console.log(err.message);
        }
        else{
            conn.createChannel(function(err, ch) {
                if (err){
                    console.log(err.message);
                    conn.close();
                }
                else{
                    //
                    // Don't specify a name or use 'amq.gen-' prefix as this is only resource allowed to be created
                    // Use exclusive flag so it auto deletes!
                    //
                    ch.assertQueue('', {exclusive : true, autoDelete: true}, function(err, q) {

                        if(err){
                            console.log(err.message);
                        }
                        else {
                            // Setup a route for this queue
                            ch.bindQueue(q.queue, 'acct.dx', 'dc');

                            // and subscribe, no ack as we're not in charge of persistance with a temporary use case
                            ch.consume(q.queue, function(msg) {
                                // print message
                                console.log(msg.content.toString());
                            }, {noAck: true});
                        }
                    });
                }
            });
        }
    });
}

accountingRecords();
