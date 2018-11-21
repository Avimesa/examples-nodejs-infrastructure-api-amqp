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

// Load environment variables
env.config();

exports.getConnParams = function(){

	// Use environment variables for the connection paramaters for AMQP
	return {
		protocol: 'amqps',
		hostname: process.env.RMQ_HOSTNAME,
		port: process.env.RMQ_PORT,
		vhost: process.env.RMQ_VHOST,
		username: process.env.RMQ_GROUP_ID,
		password: process.env.RMQ_AUTH_KEY,
		locale: 'en_US',
		frameMax: 0,
		heartbeat: 0
	};
};

exports.getRmqSettings = function(){
	return {
		queues: {
			dc_acct : 'dc_acct_q',
			sys_log : 'sys_log_q',
			admin_out : 'admin_out_q'
		},
		exchanges : {
			acct : 'acct.dx',
			log : 'log.dx',
			admin : 'admin.dx'
		},
		routingKeys : {
			dev_cloud : 'dc',
			sys : 'sys',
			admin_in : 'in',
			admin_out : 'out'
		}
	};
};
