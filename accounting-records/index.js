/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const api = require('@avimesa/infra-api-amqp');

/**
 * queue-temp-subscriber example
 *
 * @returns none
 */
function accountingRecordsExample(){
    console.log("accounting-records");

	api.setConnParams({
		hostname: 'queues.avimesacorp.net',
		apiKey: '',
		apiPassword: '',
	});

    api.acctRecordListener(function (err,msg) {
       console.log(msg);
	});
}

accountingRecordsExample();
