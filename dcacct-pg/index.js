/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const logger = require('../services/logger');
const api    = require('../lib/infra-api-amqp');
const db     = require('../services/postgres');

const path   = require('path');
const scriptName = path.basename(__filename);

/**
 * dcacctpg - Device Cloud Accounting Record Postgres
 *
 * @returns none
 */
function dcacctpg(){
	logger.log_info(scriptName, "Device Cloud Accounting Record Postgres");

	if (db.connect()) {
		api.acctRecordListener(function (err,msg) {
			if(err){
				logger.log_error(scriptName, "RMQ error, exitting...");
				process.exit(0);
			}
			else {
				var acctRecord = JSON.parse(msg)
				db.writeAcctRecord(acctRecord.dts, acctRecord, function (ok) {
					if(!ok){
						logger.log_error(scriptName, "PG write error");
					}
				});
			}
		});
	}
	else {
		logger.log_error(scriptName, "Unable to connect to database");
	}
}

dcacctpg();
