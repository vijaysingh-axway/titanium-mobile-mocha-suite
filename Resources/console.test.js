/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018-Present by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* global Ti */
/* eslint no-unused-expressions: "off" */
'use strict';
var should = require('./utilities/assertions'); // eslint-disable-line no-unused-vars

describe('console', function () {
	it('exists as an object in global namespace', function () {
		should(console).be.an.Object;
	});

	it('#log', function () {
		should(console.log).be.a.Function;
	});

	it('#info', function () {
		should(console.info).be.a.Function;
	});

	it('#error', function () {
		should(console.error).be.a.Function;
	});

	it('#warn', function () {
		should(console.warn).be.a.Function;
	});

	it('#time', function () {
		should(console.time).be.a.Function;
	});

	it('#timeEnd', function () {
		should(console.timeEnd).be.a.Function;
	});
});
