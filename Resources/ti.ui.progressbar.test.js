/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./utilities/assertions'),
	utilities = require('./utilities/utilities');

describe('Titanium.UI.ProgressBar', function () {
	// FIXME Get working on iOS and Android
	((utilities.isIOS() || utilities.isAndroid()) ? it.skip : it)('apiName', function () {
		should(Ti.UI.ProgressBar).have.readOnlyProperty('apiName').which.is.a.String;
		should(Ti.UI.ProgressBar.apiName).be.eql('Ti.UI.ProgressBar');
	});

	it('message', function () {
		var bar = Ti.UI.createProgressBar({
			message: 'this is some text'
		});
		should(bar.message).be.a.String;
		should(bar.getMessage).be.a.Function;
		should(bar.message).eql('this is some text');
		should(bar.getMessage()).eql('this is some text');
		bar.message = 'other text';
		should(bar.message).eql('other text');
		should(bar.getMessage()).eql('other text');
	});

	it('min', function () {
		var bar = Ti.UI.createProgressBar({
			min: 0
		});
		should(bar.min).be.a.Number;
		should(bar.getMin).be.a.Function;
		should(bar.min).eql(0);
		should(bar.getMin()).eql(0);
		bar.min = 100;
		should(bar.min).eql(100);
		should(bar.getMin()).eql(100);
	});

	it('max', function () {
		var bar = Ti.UI.createProgressBar({
			max: 0
		});
		should(bar.max).be.a.Number;
		should(bar.getMax).be.a.Function;
		should(bar.max).eql(0);
		should(bar.getMax()).eql(0);
		bar.max = 100;
		should(bar.max).eql(100);
		should(bar.getMax()).eql(100);
	});

	it('value', function () {
		var bar = Ti.UI.createProgressBar({
			value: 0
		});
		should(bar.value).be.a.Number;
		should(bar.getValue).be.a.Function;
		should(bar.value).eql(0);
		should(bar.getValue()).eql(0);
		bar.value = 100;
		should(bar.value).eql(100);
		should(bar.getValue()).eql(100);
	});
	// TODO Add tests for style, color and font?
});
