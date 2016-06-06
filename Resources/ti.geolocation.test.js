/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Geolocation', function () {
	it('apiName', function (finish) {
		should(Ti.Geolocation.apiName).be.eql('Ti.Geolocation');
		finish();
	});

	// Check if ACCURACY_BEST exists and make sure it does not throw exception
	it('ACCURACY_BEST', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_BEST').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_BEST_FOR_NAVIGATION exists and make sure it does not throw exception
	it('ACCURACY_BEST_FOR_NAVIGATION', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_BEST_FOR_NAVIGATION').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_HIGH exists and make sure it does not throw exception
	it('ACCURACY_HIGH', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_HIGH').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_HUNDRED_METERS exists and make sure it does not throw exception
	it('ACCURACY_HUNDRED_METERS', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_HUNDRED_METERS').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_KILOMETER exists and make sure it does not throw exception
	it('ACCURACY_KILOMETER', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_KILOMETER').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_LOW exists and make sure it does not throw exception
	it('ACCURACY_LOW', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_LOW').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_NEAREST_TEN_METERS exists and make sure it does not throw exception
	it('ACCURACY_NEAREST_TEN_METERS', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_NEAREST_TEN_METERS').which.is.a.Number;
		finish();
	});

	// Check if ACCURACY_THREE_KILOMETERS exists and make sure it does not throw exception
	it('ACCURACY_THREE_KILOMETERS', function (finish) {
		should(Ti.Geolocation).have.constant('ACCURACY_THREE_KILOMETERS').which.is.a.Number;
		finish();
	});

	it('accuracy', function (finish) {
		should(Ti.Geolocation.getAccuracy()).be.a.Number;
		should(Ti.Geolocation.getAccuracy).be.a.Function;
		should(Ti.Geolocation.setAccuracy).be.a.Function;
		Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_BEST);
		should(Ti.Geolocation.getAccuracy()).be.eql(Ti.Geolocation.ACCURACY_BEST);
		finish();
	});

	it('distanceFilter', function (finish) {
		should(Ti.Geolocation.getDistanceFilter()).be.a.Number;
		should(Ti.Geolocation.getDistanceFilter).be.a.Function;
		should(Ti.Geolocation.setDistanceFilter).be.a.Function;
		Ti.Geolocation.setDistanceFilter(1000);
		should(Ti.Geolocation.getDistanceFilter()).be.eql(1000);
		finish();
	});

	it('headingFilter', function (finish) {
		should(Ti.Geolocation.getHeadingFilter()).be.a.Number;
		should(Ti.Geolocation.getHeadingFilter).be.a.Function;
		should(Ti.Geolocation.setHeadingFilter).be.a.Function;
		Ti.Geolocation.setHeadingFilter(90);
		should(Ti.Geolocation.getHeadingFilter()).be.eql(90);
		finish();
	});

	it('lastGeolocation', function (finish) {
		should(Ti.Geolocation.getLastGeolocation()).be.a.Object;
		should(Ti.Geolocation.getLastGeolocation).be.a.Function;
		finish();
	});

	it('locationServicesEnabled', function (finish) {
		should(Ti.Geolocation.getLocationServicesEnabled()).be.a.Boolean;
		should(Ti.Geolocation.getLocationServicesEnabled).be.a.Function;
		finish();
	});

	it('forwardGeocoder', function (finish) {
		should(Ti.Geolocation.forwardGeocoder).be.a.Function;
		Ti.Geolocation.forwardGeocoder('440 N Bernardo Ave, Mountain View', function (data) {
			should(data.latitude).be.eql(37.3883645);
			should(data.longitude).be.eql(-122.0512682);
		});
		finish();
	});

	it('reverseGeocoder', function (finish) {
		should(Ti.Geolocation.reverseGeocoder).be.a.Function;
		Ti.Geolocation.reverseGeocoder(37.3883645, -122.0512682, function (data) {
			should(data.zipcode).be.eql('94043');
		});
		finish();
	});

	it('currentPosition', function (finish) {
		should(Ti.Geolocation.getCurrentPosition).be.a.Function;
		finish();
	});

	it('currentHeading', function (finish) {
		should(Ti.Geolocation.getCurrentHeading).be.a.Function;
		finish();
	});
});
