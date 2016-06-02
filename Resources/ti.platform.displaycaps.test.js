/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Platform.DisplayCaps', function () {
	it('apiName', function () {
		should(Ti.Platform.DisplayCaps.apiName).be.eql('Ti.Platform.DisplayCaps');
		should(Ti.Platform.DisplayCaps.apiName).be.a.readOnlyString;
	});

	it('density', function () {
		should(Ti.Platform.displayCaps.density).be.a.readOnlyString;
		// TODO Test for known range of values?
		// Android: "high", "medium", "xhigh", "xxhigh", "xxxhigh", "low", "medium"
		// iOS: "xhigh", "high", "medium"
	});

	it('getDensity()', function () {
		should(Ti.Platform.displayCaps.getDensity.be.a.Function;
		should(Ti.Platform.displayCaps.getDensity()).be.a.String;
	});

	it('dpi', function () {
		should(Ti.Platform.displayCaps.dpi).be.a.readOnlyNumber;
		should(Ti.Platform.displayCaps.dpi).be.above(0);
	});

	it('getDpi()', function () {
		should(Ti.Platform.displayCaps.getDpi).be.a.Function;
		should(Ti.Platform.displayCaps.getDpi()).be.a.Number;
	});

	it('logicalDensityFactor', function () {
		should(Ti.Platform.displayCaps.logicalDensityFactor).be.a.readOnlyNumber;
		should(Ti.Platform.displayCaps.logicalDensityFactor).be.above(0);
	});

	it('getLogicalDensityFactor()', function () {
		should(Ti.Platform.displayCaps.getLogicalDensityFactor).be.a.Function;
		should(Ti.Platform.displayCaps.getLogicalDensityFactor()).be.a.Number;
	});

	it('platformHeight', function () {
		should(Ti.Platform.displayCaps.platformHeight).be.a.Number;
		should(Ti.Platform.displayCaps.platformHeight).be.above(0);
	});

	it('getPlatformHeight()', function () {
		should(Ti.Platform.displayCaps.getPlatformHeight).be.a.Function;
		should(Ti.Platform.displayCaps.getPlatformHeight()).be.a.Number;
	});

	it('platformWidth', function () {
		should(Ti.Platform.displayCaps.platformWidth).be.a.Number;
		should(Ti.Platform.displayCaps.platformWidth).be.above(0);
	});

	it('getPlatformWidth()', function () {
		should(Ti.Platform.displayCaps.getPlatformWidth).be.a.Function;
		should(Ti.Platform.displayCaps.getPlatformWidth()).be.a.Number;
	});

	(utilities.isIOS() ? it.skip : it)('xdpi', function () {
		should(Ti.Platform.displayCaps.xdpi).be.a.readOnlyNumber;
		should(Ti.Platform.displayCaps.xdpi).be.above(0);
	});

	(utilities.isIOS() ? it.skip : it)('getXdpi()', function () {
		should(Ti.Platform.displayCaps.getXdpi).be.a.Function;
		should(Ti.Platform.displayCaps.getXdpi()).be.a.Number;
	});

	(utilities.isIOS() ? it.skip : it)('ydpi', function () {
		should(Ti.Platform.displayCaps.ydpi).be.a.readOnlyNumber;
		should(Ti.Platform.displayCaps.ydpi).be.above(0);
	});

	(utilities.isIOS() ? it.skip : it)('getYdpi()', function () {
		should(Ti.Platform.displayCaps.getYdpi).be.a.Function;
		should(Ti.Platform.displayCaps.getYdpi()).be.a.Number;
	});
});
