/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-Present by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* global Ti */
/* eslint no-unused-expressions: "off" */
'use strict';
var should = require('./utilities/assertions'), // eslint-disable-line no-unused-vars
	utilities = require('./utilities/utilities');

describe('Error', function () {
	it('JS error thrown', function () {
		var e = {};

		try {
			Ti.API.info(e.test.crash);
			should.fail('Expected to throw exception');
		} catch (ex) {
			Ti.API.info(JSON.stringify(ex));
			ex.should.have.property('message');
			if (utilities.isAndroid()) {
				ex.message.should.equal('Cannot read property \'crash\' of undefined');
			} else {
				ex.message.should.equal('undefined is not an object (evaluating \'e.test.crash\')');
			}

			// has typical stack property
			ex.should.have.property('stack');
			if (utilities.isAndroid()) {
				ex.stack.should.containEql('TypeError: Cannot read property \'crash\' of undefined');
			}
			// iOS Has just the stacktrace without a preceding message/type. Also has 'column', 'line', 'sourceURL'
			// does not have java stack trace
			ex.should.not.have.property('nativeStack');
		}
	});

	it.android('Java exception surfaced', function () {
		try {
			Ti.Geolocation.accuracy = null; // TODO This does not result in an Error on iOS, because I think it silently defaults to 0!
			should.fail('Expected to throw exception');
		} catch (ex) {
			ex.should.have.property('message');
			ex.message.should.equal('Unable to convert null');
			// has typical stack property for JS
			ex.should.have.property('stack');
			ex.stack.should.containEql('Error: Unable to convert null'); // TODO Verify app.js in stack?
			// has special javaStack property for java stacktrace
			ex.should.have.property('nativeStack');
			ex.nativeStack.should.containEql('org.appcelerator.titanium.util.TiConvert.toInt(TiConvert.java:'); // points to Java code in stack
		}
	});

	it('throw(String)', function () {
		try {
			throw ('this is my error string'); // eslint-disable-line no-throw-literal
		} catch (ex) {
			ex.should.equal('this is my error string');
			ex.should.not.have.property('message');
			ex.should.not.have.property('stack');
			ex.should.not.have.property('nativeStack');
		}
	});
});
