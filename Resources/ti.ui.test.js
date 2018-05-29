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
var should = require('./utilities/assertions');

describe('Titanium.UI', function () {
	var win,
		didFocus = false,
		rootWindow;

	this.timeout(5000);

	// Create and open a root window for the rest of the below child window tests to use as a parent.
	// We're not going to close this window until the end of this test suite.
	// Note: Android needs this so that closing the last window won't back us out of the app.
	before(function (finish) {
		rootWindow = Ti.UI.createWindow();
		rootWindow.addEventListener('open', function () {
			finish();
		});
		rootWindow.open();
	});

	after(function (finish) {
		rootWindow.addEventListener('close', function () {
			finish();
		});
		rootWindow.close();
	});

	beforeEach(function () {
		didFocus = false;
	});

	afterEach(function () {
		if (win) {
			win.close();
		}
		win = null;
	});

	// TODO Write some tests for converting various units back and forth!
	it('#convertUnits(String, Number)');

	// Constants are tested in ti.ui.constants.test.js

	// TODO Write tests for Ti.UI.global properties below!
	it('backgroundColor');
	it('backgroundImage');
	it('currentTab');

	// FIXME Get working on iOS
	// FIXME Get working on Android - Ti.UI.currentWindow is null
	// Supposedly this property should only exist when using Ti.UI.Window.url to load JS files into own context! But we support elsewhere for Windows
	it.androidAndIosBroken('.currentWindow', function (finish) {
		win = Ti.UI.createWindow({
			backgroundColor: 'yellow'
		});
		win.addEventListener('focus', function () {
			if (didFocus) {
				return;
			}
			didFocus = true;

			try {
				should(Ti.UI.currentWindow).exist; // Android gives null
				should(Ti.UI.currentWindow).be.eql(win); // iOS fails here

				finish();
			} catch (err) {
				finish(err);
			}
		});
		win.open();
	});

	it.ios('tintColor');
});
