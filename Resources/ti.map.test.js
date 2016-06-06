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
	it('apiName', function () {
		should(Map).have.a.readOnlyProperty('apiName').which.is.a.String;
		should(Map.apiName).be.eql('Ti.Map');
	});

	it('ANNOTATION_AZURE', function () {
		should(Map).have.constant('ANNOTATION_AZURE').which.is.a.Number;
	});

	it('ANNOTATION_BLUE', function () {
		should(Map).have.constant('ANNOTATION_BLUE').which.is.a.Number;
	});

	it('ANNOTATION_CYAN', function () {
		should(Map).have.constant('ANNOTATION_CYAN').which.is.a.Number;
	});

	it('ANNOTATION_GREEN', function () {
		should(Map).have.constant('ANNOTATION_GREEN').which.is.a.Number;
	});

	it('ANNOTATION_MAGENTA', function () {
		should(Map).have.constant('ANNOTATION_MAGENTA').which.is.a.Number;
	});

	it('ANNOTATION_ORANGE', function () {
		should(Map).have.constant('ANNOTATION_ORANGE').which.is.a.Number;
	});

	it('ANNOTATION_PURPLE', function () {
		should(Map).have.constant('ANNOTATION_PURPLE').which.is.a.Number;
	});

	it('ANNOTATION_RED', function () {
		should(Map).have.constant('ANNOTATION_RED').which.is.a.Number;
	});

	it('ANNOTATION_ROSE', function () {
		should(Map).have.constant('ANNOTATION_ROSE').which.is.a.Number;
	});

	it('ANNOTATION_VIOLET', function () {
		should(Map).have.constant('ANNOTATION_VIOLET').which.is.a.Number;
	});

	it('ANNOTATION_YELLOW', function () {
		should(Map).have.constant('ANNOTATION_YELLOW').which.is.a.Number;
	});

	it('ANNOTATION_DRAG_STATE_END', function () {
		should(Map).have.constant('ANNOTATION_DRAG_STATE_END').which.is.a.Number;
	});

	it('ANNOTATION_DRAG_STATE_START', function () {
		should(Map).have.constant('ANNOTATION_DRAG_STATE_START').which.is.a.Number;
	});

	it('OVERLAY_LEVEL_ABOVE_LABELS', function () {
		should(Map).have.constant('OVERLAY_LEVEL_ABOVE_LABELS').which.is.a.Number;
	});

	it('OVERLAY_LEVEL_ABOVE_ROADS', function () {
		should(Map).have.constant('OVERLAY_LEVEL_ABOVE_ROADS').which.is.a.Number;
	});

	it('SERVICE_DISABLED', function () {
		should(Map).have.constant('SERVICE_DISABLED').which.is.a.Number;
	});

	it('SERVICE_INVALID', function () {
		should(Map).have.constant('SERVICE_INVALID').which.is.a.Number;
	});

	it('SERVICE_MISSING', function () {
		should(Map).have.constant('SERVICE_MISSING').which.is.a.Number;
	});

	it('SERVICE_VERSION_UPDATE_REQUIRED', function () {
		should(Map).have.constant('SERVICE_VERSION_UPDATE_REQUIRED').which.is.a.Number;
	});

	it('SUCCESS', function () {
		should(Map).have.constant('SUCCESS').which.is.a.Number;
	});

	it('NORMAL_TYPE', function () {
		should(Map).have.constant('NORMAL_TYPE').which.is.a.Number;
	});

	it('SATELLITE_TYPE', function () {
		should(Map).have.constant('SATELLITE_TYPE').which.is.a.Number;
	});

	it('HYBRID_TYPE', function () {
		should(Map).have.constant('HYBRID_TYPE').which.is.a.Number;
	});

	it('TERRAIN_TYPE', function () {
		should(Map).have.constant('TERRAIN_TYPE').which.is.a.Number;
	});

	it('#createAnnotation()', function () {
		should(Map.createAnnotation).not.be.undefined;
		should(Map.createAnnotation).be.a.Function;
	});

	it('#createCamera()', function () {
		should(Map.createCamera).not.be.undefined;
		should(Map.createCamera).be.a.Function;
	});

	it('#createRoute()', function () {
		should(Map.createRoute).not.be.undefined;
		should(Map.createRoute).be.a.Function;
	});

	it('#createView()', function () {
		should(Map.createView).not.be.undefined;
		should(Map.createView).be.a.Function;

		//var view = Map.createView({mapType: Map.NORMAL_TYPE});

		// Confirm 'view' is an object
		//should(view).be.a.Object;
		// TODO Confirm that it has certain properties, etc.
	});

	it('#isGooglePlayServicesAvailable()', function () {
		should(Map.isGooglePlayServicesAvailable).not.be.undefined;
		should(Map.isGooglePlayServicesAvailable).be.a.Function;

		var value = Map.isGooglePlayServicesAvailable();
		should(value).be.a.Number;
	});
});
