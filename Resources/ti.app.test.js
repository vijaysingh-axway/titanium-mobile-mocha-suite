/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.App', function () {

	it('EVENT_ACCESSIBILITY_ANNOUNCEMENT', function () {
		should(Ti.App.EVENT_ACCESSIBILITY_ANNOUNCEMENT).be.a.readOnlyString;
		should(Ti.App.EVENT_ACCESSIBILITY_CHANGED).be.eql('accessibilityannouncement');
	});

	it('EVENT_ACCESSIBILITY_CHANGED', function () {
		should(Ti.App.EVENT_ACCESSIBILITY_CHANGED).be.a.readOnlyString;
		should(Ti.App.EVENT_ACCESSIBILITY_CHANGED).be.eql('accessibilitychanged');
	});

	// TODO Add tests for set* methods!

	it('apiName', function () {
		should(Ti.App.apiName).be.eql('Ti.App');
		should(Ti.App.apiName).be.a.readOnlyString;
	});

	it('accessibilityEnabled', function () {
		should(Ti.App.accessibilityEnabled).be.a.Boolean;
		should(Ti.App.accessibilityEnabled).be.readOnly;
	});

	it('getAccessibilityEnabled()', function () {
		should(Ti.App.getAccessibilityEnabled).be.a.Function;
		should(Ti.App.getAccessibilityEnabled()).be.a.Boolean;
	});

	it('analytics', function () {
		should(Ti.App.analytics).be.a.Boolean;
		should(Ti.App.analytics).be.readOnly;
	});

	it('getAnalytics()', function () {
		should(Ti.App.getAnalytics).be.a.Function;
		should(Ti.App.getAnalytics()).be.a.Boolean;
	});

	it('copyright', function () {
		should(Ti.App.copyright).be.a.readOnlyString;
	});

	it('getCopyright()', function () {
		should(Ti.App.getCopyright).be.a.Function;
		should(Ti.App.getCopyright()).be.a.String;
	});

	it('deployType', function () {
		should(Ti.App.deployType).be.a.readOnlyString;
	});

	it('getDeployType()', function () {
		should(Ti.App.getDeployType).be.a.Function;
		should(Ti.App.getDeployType()).be.a.String;
	});

	it('description', function () {
		should(Ti.App.description).be.a.readOnlyString;
	});

	it('getDescription()', function () {
		should(Ti.App.getDescription).be.a.Function;
		should(Ti.App.getDescription()).be.a.String;
	});

	(utilities.isIOS() ? it : it.skip)('disableNetworkActivityIndicator', function () {
		should(Ti.App.disableNetworkActivityIndicator).be.a.Boolean;
	});

	(utilities.isIOS() ? it : it.skip)('getDisableNetworkActivityIndicator()', function () {
		should(Ti.App.getDisableNetworkActivityIndicator).be.a.Function;
		should(Ti.App.getDisableNetworkActivityIndicator()).be.a.Boolean;
	});

	(utilities.isIOS() ? it : it.skip)('forceSplashAsSnapshot', function () {
		should(Ti.App.forceSplashAsSnapshot).be.a.Boolean;
	});

	(utilities.isIOS() ? it : it.skip)('getForceSplashAsSnapshot()', function () {
		should(Ti.App.getForceSplashAsSnapshot).be.a.Function;
		should(Ti.App.getForceSplashAsSnapshot()).be.a.Boolean;
	});

	it('guid', function () {
		should(Ti.App.guid).be.a.readOnlyString;
	});

	it('getGuid()', function () {
		should(Ti.App.getGuid).be.a.Function;
		should(Ti.App.getGuid()).be.a.String;
	});

	it('id', function () {
		should(Ti.App.id).be.a.readOnlyString;
	});

	it('getId()', function () {
		should(Ti.App.getId).be.a.Function;
		should(Ti.App.getId()).be.a.String;
	});

	(utilities.isAndroid() ? it.skip : it)('idleTimerDisabled', function () {
		should(Ti.App.idleTimerDisabled).be.a.Boolean;
	});

	(utilities.isAndroid() ? it.skip : it)('getIdleTimerDisabled()', function () {
		should(Ti.App.getIdleTimerDisabled).be.a.Function;
		should(Ti.App.getIdleTimerDisabled()).be.a.Boolean;
	});

	(utilities.isAndroid() ? it.skip : it)('installId', function () {
		should(Ti.App.installId).be.a.readOnlyString;
		should(Ti.App.getInstallId).be.a.Function;
		should(Ti.App.getInstallId()).be.a.String;
	});

	(utilities.isAndroid() ? it.skip : it)('getInstallId()', function () {
		should(Ti.App.getInstallId).be.a.Function;
		should(Ti.App.getInstallId()).be.a.String;
	});

	(utilities.isAndroid() ? it.skip : it)('keyboardVisible', function () {
		should(Ti.App.keyboardVisible).be.a.Boolean;
		should(Ti.App.keyboardVisible).be.readOnly;
	});

	(utilities.isAndroid() ? it.skip : it)('getKeyboardVisible()', function () {
		should(Ti.App.getKeyboardVisible).be.a.Function;
		should(Ti.App.getKeyboardVisible()).be.a.Boolean;
	});

	it('name', function () {
		should(Ti.App.name).be.a.readOnlyString;
	});

	it('getName()', function () {
		should(Ti.App.getName).be.a.Function;
		should(Ti.App.getName()).be.a.String;
	});

	(utilities.isWindows() ? it.skip : it)('proximityDetection', function () {
		should(Ti.App.proximityDetection).be.a.Boolean;
	});

	(utilities.isWindows() ? it.skip : it)('getProximityDetection()', function () {
		should(Ti.App.getProximityDetection).be.a.Function;
		should(Ti.App.getProximityDetection()).be.a.Boolean;
	});

	(utilities.isWindows() ? it.skip : it)('proximityState', function () {
		should(Ti.App.proximityState).be.a.Boolean;
		should(Ti.App.getProximityState).be.a.Function;
		should(Ti.App.getProximityState()).be.a.Boolean;
	});

	(utilities.isWindows() ? it.skip : it)('getProximityState()', function () {
		should(Ti.App.getProximityState).be.a.Function;
		should(Ti.App.getProximityState()).be.a.Boolean;
	});

	it('publisher', function () {
		should(Ti.App.publisher).be.a.readOnlyString;
	});

	it('getPublisher()', function () {
		should(Ti.App.getPublisher).be.a.Function;
		should(Ti.App.getPublisher()).be.a.String;
	});

	it('sessionId', function () {
		should(Ti.App.sessionId).be.a.readOnlyString;
	});

	it('getSessionId()', function () {
		should(Ti.App.getSessionId).be.a.Function;
		should(Ti.App.getSessionId()).be.a.String;
	});

	it('url', function () {
		should(Ti.App.url).be.a.readOnlyString;
	});

	it('getUrl()', function () {
		should(Ti.App.getUrl).be.a.Function;
		should(Ti.App.getUrl()).be.a.String;
	});

	it('version', function () {
		should(Ti.App.version).be.a.readOnlyString;
	});

	it('getVersion()', function () {
		should(Ti.App.getVersion).be.a.Function;
		should(Ti.App.getVersion()).be.a.String;
	});
});
