/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Map', function () {
	it('apiName', function (finish) {
		should(Ti.Map.apiName).be.eql('Ti.Map');
		finish();
	});

	it('ANNOTATION_AZURE', function (finish) {
		should(Ti.Map.ANNOTATION_AZURE).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_BLUE', function (finish) {
		should(Ti.Map.ANNOTATION_BLUE).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_CYAN', function (finish) {
		should(Ti.Map.ANNOTATION_CYAN).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_GREEN', function (finish) {
		should(Ti.Map.ANNOTATION_GREEN).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_MAGENTA', function (finish) {
		should(Ti.Map.ANNOTATION_MAGENTA).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_ORANGE', function (finish) {
		should(Ti.Map.ANNOTATION_ORANGE).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_PURPLE', function (finish) {
		should(Ti.Map.ANNOTATION_PURPLE).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_RED', function (finish) {
		should(Ti.Map.ANNOTATION_RED).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_ROSE', function (finish) {
		should(Ti.Map.ANNOTATION_ROSE).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_VIOLET', function (finish) {
		should(Ti.Map.ANNOTATION_VIOLET).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_YELLOW', function (finish) {
		should(Ti.Map.ANNOTATION_YELLOW).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_DRAG_STATE_END', function (finish) {
		should(Ti.Map.ANNOTATION_DRAG_STATE_END).be.a.readOnlyNumber;
		finish();
	});

	it('ANNOTATION_DRAG_STATE_START', function (finish) {
		should(Ti.Map.ANNOTATION_DRAG_STATE_START).be.a.readOnlyNumber;
		finish();
	});

	it('OVERLAY_LEVEL_ABOVE_LABELS', function (finish) {
		should(Ti.Map.OVERLAY_LEVEL_ABOVE_LABELS).be.a.readOnlyNumber;
		finish();
	});

	it('OVERLAY_LEVEL_ABOVE_ROADS', function (finish) {
		should(Ti.Map.OVERLAY_LEVEL_ABOVE_ROADS).be.a.readOnlyNumber;
		finish();
	});

	it('SERVICE_DISABLED', function (finish) {
		should(Ti.Map.SERVICE_DISABLED).be.a.readOnlyNumber;
		finish();
	});

	it('SERVICE_INVALID', function (finish) {
		should(Ti.Map.SERVICE_INVALID).be.a.readOnlyNumber;
		finish();
	});

	it('SERVICE_MISSING', function (finish) {
		should(Ti.Map.SERVICE_MISSING).be.a.readOnlyNumber;
		finish();
	});

	it('SERVICE_VERSION_UPDATE_REQUIRED', function (finish) {
		should(Ti.Map.SERVICE_VERSION_UPDATE_REQUIRED).be.a.readOnlyNumber;
		finish();
	});

	it('SUCCESS', function (finish) {
		should(Ti.Map.SUCCESS).be.a.readOnlyNumber;
		finish();
	});

	it('NORMAL_TYPE', function (finish) {
		should(Ti.Map.NORMAL_TYPE).be.a.readOnlyNumber;
		finish();
	});

	it('SATELLITE_TYPE', function (finish) {
		should(Ti.Map.SATELLITE_TYPE).be.a.readOnlyNumber;
		finish();
	});

	it('HYBRID_TYPE', function (finish) {
		should(Ti.Map.HYBRID_TYPE).be.a.readOnlyNumber;
		finish();
	});

	it('TERRAIN_TYPE', function (finish) {
		should(Ti.Map.TERRAIN_TYPE).be.a.readOnlyNumber;
		finish();
	});

	it('#createAnnotation()', function (finish) {
		should(Ti.Map.createAnnotation).not.be.undefined;
		should(Ti.Map.createAnnotation).be.a.Function;

		finish();
	});

	it('#createCamera()', function (finish) {
		should(Ti.Map.createCamera).not.be.undefined;
		should(Ti.Map.createCamera).be.a.Function;

		finish();
	});

	it('#createRoute()', function (finish) {
		should(Ti.Map.createRoute).not.be.undefined;
		should(Ti.Map.createRoute).be.a.Function;

		finish();
	});

	it('#createView()', function (finish) {
		should(Ti.Map.createView).not.be.undefined;
		should(Ti.Map.createView).be.a.Function;

		//var view = Ti.Map.createView({mapType: Ti.Map.NORMAL_TYPE});

		// Confirm 'view' is an object
		//should(view).be.a.Object;
		// TODO Confirm that it has certain properties, etc.

		finish();
	});

	it('#isGooglePlayServicesAvailable()', function (finish) {
		should(Ti.Map.isGooglePlayServicesAvailable).not.be.undefined;
		should(Ti.Map.isGooglePlayServicesAvailable).be.a.Function;

		var value = Ti.Map.isGooglePlayServicesAvailable();
		should(value).be.a.Number;

		finish();
	});
});
