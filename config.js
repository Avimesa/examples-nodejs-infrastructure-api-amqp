/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const env = require('dotenv');
const path = require('path');

// Load environment variables
env.config();

// if .env not found, try the parent directory...
if (!process.env.RMQ_HOSTNAME) {
    var parent = path.resolve(process.cwd(), '..') + "/.env";
    var options = {
        path : parent
    };
    env.config(options);
}

exports.getConnParams = function () {

    // Use environment variables for the connection paramaters for AMQP
    const connParams = {
        protocol: 'amqps',
        hostname: process.env.RMQ_HOSTNAME,
        port: process.env.RMQ_PORT,
        vhost: process.env.RMQ_GROUP_ID,
        username: process.env.RMQ_GROUP_ID,
        password: process.env.RMQ_AUTH_KEY,
        locale: 'en_US',
        frameMax: 0,
        heartbeat: 0
    };

    console.log("");
    console.log("Using the following endpoint and credentials:");
    console.log("\tHostname:\t" + process.env.RMQ_HOSTNAME);
    console.log("\tPort:\t\t" +   process.env.RMQ_PORT);
    console.log("\tGroup ID:\t" + process.env.RMQ_GROUP_ID);
    console.log("\tAuth Key:\t" + process.env.RMQ_AUTH_KEY);
    console.log("");

    return connParams;
};

exports.getRmqSettings = function () {
    return {
        queues: {
            raw : 'raw_q',
            notification : 'not_q',
            syslog : 'sys_log_q',
            adminOut : 'admin_out_q'
        },
        exchanges : {
            data : 'data.dx',
            actuation : 'actuation.dx',
            admin : 'admin.dx'
        },
        routingKeys : {
            raw : 'raw',
            notification : 'not',
            admin_in : 'in',
            admin_out : 'out'
        }
    };
};
