/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const pg     = require('pg');
//const config = require('../../config');
const logger = require('../logger');
const path = require('path');
const scriptName = path.basename(__filename);

var pgClient = null;

function getConnStr(){
	//const cfg = config.postgres;
	//const connStr = `postgres://${cfg.username}:${cfg.password}@${cfg.hostname}:${cfg.port}/${cfg.database}`;
	const connStr = `postgres://infrastructure:infrastructure@$localhost:5432/infrastructure`;
	return connStr;
}

/**
 * Connects to database based on configuration
 *
 * @returns {Boolean} result
 */
exports.connect = function(){
	var result = false;
	const connStr = getConnStr();
	logger.log_info(scriptName, `Connecting to: ${connStr}`);

	try {
		pgClient = new pg.Client(connStr);
		pgClient.connect();
		logger.log_info(scriptName, 'Connected');
		result = true;
	}catch (error) {
		logger.log_error(scriptName, `Failed to connect: ${error}`);
	}
	return result;
};

/**
 * Disconnects from database
 */
exports.disconnect = function() {
	logger.log_info(scriptName, 'Disconnecting...');

	if (pgClient !== null){
		pgClient.end();
		logger.log_info(scriptName, 'Disconnected');
	} else {
		logger.log_error(scriptName, 'no client');
	}
};

exports.writeAcctRecord = function(dts, json_data, write_cb){
	logger.log_info(scriptName, 'writeAcctRecord');

	if (pgClient !== null) {
		const sqlcmd = `INSERT INTO dcacct(time,data) values($1, $2)`;

		// convert date from paylod for insertion
		const dts = new Date(dts);
		const data = [dts, json_data];

		pgClient.query(sqlcmd, data, (err, res) => {
			if (err){
				logger.log_error(scriptName, `${err.stack}`);
				write_cb(false);
			} else {
				logger.log_info(scriptName, `success ${res.command}  ${res.rowCount} rows`);
				write_cb(true);
			}
		});

	} else {
		logger.log_error(scriptName, 'no client');
		write_cb(false);
	}
};

exports.writeSyslogRecord = function(dts, json_data, write_cb){
	logger.log_info(scriptName, 'writeSyslogRecord');

	if (pgClient !== null) {
		const sqlcmd = `INSERT INTO syslog(time,data) values($1, $2)`;

		// convert date from paylod for insertion
		const dts = new Date(dts);
		const data = [dts, json_data];

		pgClient.query(sqlcmd, data, (err, res) => {
			if (err){
				logger.log_error(scriptName, `${err.stack}`);
				write_cb(false);
			} else {
				logger.log_info(scriptName, `success ${res.command}  ${res.rowCount} rows`);
				write_cb(true);
			}
		});

	} else {
		logger.log_error(scriptName, 'no client');
		write_cb(false);
	}
};

