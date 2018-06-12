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
var should = require('./utilities/assertions');

describe('Timers', function () {
	it('setTimeout', function () {
		should(setTimeout).be.a.Function;
	});

	it('setInterval', function () {
		should(setInterval).be.a.Function;
	});

	it('clearTimeout', function () {
		should(clearTimeout).be.a.Function;
	});

	it('clearInterval', function () {
		should(clearInterval).be.a.Function;
	});
});
