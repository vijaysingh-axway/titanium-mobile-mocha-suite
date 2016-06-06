/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions'),
	Map = require('ti.map');

describe('Titanium.Map', function () {
	it('apiName', function (finish) {
		should(Map.apiName).be.eql('Ti.Map');
		finish();
	});

	it('ANNOTATION_AZURE', function (finish) {
		should(Map).have.constant('ANNOTATION_AZURE').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_BLUE', function (finish) {
		should(Map).have.constant('ANNOTATION_BLUE').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_CYAN', function (finish) {
		should(Map).have.constant('ANNOTATION_CYAN').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_GREEN', function (finish) {
		should(Map).have.constant('ANNOTATION_GREEN').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_MAGENTA', function (finish) {
		should(Map).have.constant('ANNOTATION_MAGENTA').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_ORANGE', function (finish) {
		should(Map).have.constant('ANNOTATION_ORANGE').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_PURPLE', function (finish) {
		should(Map).have.constant('ANNOTATION_PURPLE').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_RED', function (finish) {
		should(Map).have.constant('ANNOTATION_RED').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_ROSE', function (finish) {
		should(Map).have.constant('ANNOTATION_ROSE').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_VIOLET', function (finish) {
		should(Map).have.constant('ANNOTATION_VIOLET').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_YELLOW', function (finish) {
		should(Map).have.constant('ANNOTATION_YELLOW').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_DRAG_STATE_END', function (finish) {
		should(Map).have.constant('ANNOTATION_DRAG_STATE_END').which.is.a.Number;
		finish();
	});

	it('ANNOTATION_DRAG_STATE_START', function (finish) {
		should(Map).have.constant('ANNOTATION_DRAG_STATE_START').which.is.a.Number;
		finish();
	});

	it('OVERLAY_LEVEL_ABOVE_LABELS', function (finish) {
		should(Map).have.constant('OVERLAY_LEVEL_ABOVE_LABELS').which.is.a.Number;
		finish();
	});

	it('OVERLAY_LEVEL_ABOVE_ROADS', function (finish) {
		should(Map).have.constant('OVERLAY_LEVEL_ABOVE_ROADS').which.is.a.Number;
		finish();
	});

	it('SERVICE_DISABLED', function (finish) {
		should(Map).have.constant('SERVICE_DISABLED').which.is.a.Number;
		finish();
	});

	it('SERVICE_INVALID', function (finish) {
		should(Map).have.constant('SERVICE_INVALID').which.is.a.Number;
		finish();
	});

	it('SERVICE_MISSING', function (finish) {
		should(Map).have.constant('SERVICE_MISSING').which.is.a.Number;
		finish();
	});

	it('SERVICE_VERSION_UPDATE_REQUIRED', function (finish) {
		should(Map).have.constant('SERVICE_VERSION_UPDATE_REQUIRED').which.is.a.Number;
		finish();
	});

	it('SUCCESS', function (finish) {
		should(Map).have.constant('SUCCESS').which.is.a.Number;
		finish();
	});

	it('NORMAL_TYPE', function (finish) {
		should(Map).have.constant('NORMAL_TYPE').which.is.a.Number;
		finish();
	});

	it('SATELLITE_TYPE', function (finish) {
		should(Map).have.constant('SATELLITE_TYPE').which.is.a.Number;
		finish();
	});

	it('HYBRID_TYPE', function (finish) {
		should(Map).have.constant('HYBRID_TYPE').which.is.a.Number;
		finish();
	});

	it('TERRAIN_TYPE', function (finish) {
		should(Map).have.constant('TERRAIN_TYPE').which.is.a.Number;
		finish();
	});

	it('#createAnnotation()', function (finish) {
		should(Map.createAnnotation).not.be.undefined;
		should(Map.createAnnotation).be.a.Function;

		finish();
	});

	it('#createCamera()', function (finish) {
		should(Map.createCamera).not.be.undefined;
		should(Map.createCamera).be.a.Function;

		finish();
	});

	it('#createRoute()', function (finish) {
		should(Map.createRoute).not.be.undefined;
		should(Map.createRoute).be.a.Function;

		finish();
	});

	it('#createView()', function (finish) {
		should(Map.createView).not.be.undefined;
		should(Map.createView).be.a.Function;

		//var view = Map.createView({mapType: Map.NORMAL_TYPE});

		// Confirm 'view' is an object
		//should(view).be.a.Object;
		// TODO Confirm that it has certain properties, etc.

		finish();
	});

	it('#isGooglePlayServicesAvailable()', function (finish) {
		should(Map.isGooglePlayServicesAvailable).not.be.undefined;
		should(Map.isGooglePlayServicesAvailable).be.a.Function;

		var value = Map.isGooglePlayServicesAvailable();
		should(value).be.a.Number;

		finish();
	});
});
