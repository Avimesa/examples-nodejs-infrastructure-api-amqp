/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

function log(msg, file, type){
    console.log(`${Date().toString()}:\t ${file.padEnd(16)}:\t ${type}:\t ${msg}`);
}

exports.log_info = function (file, msg){
    log(msg, file, 'Info');
};

exports.log_error = function (file, msg){
    log(msg, file, 'Error');
};