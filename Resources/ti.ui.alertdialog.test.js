/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.UI.AlertDialog', function () {
	it('apiName', function () {
		should(Ti.UI.AlertDialog.apiName).be.eql('Ti.UI.AlertDialog');
		should(Ti.UI.AlertDialog.apiName).be.a.readOnlyString;
	});

	it('title', function () {
		var bar = Ti.UI.createAlertDialog({
			title: 'this is some text'
		});
		should(bar.title).be.a.String;
		should(bar.getTitle).be.a.Function;
		should(bar.title).eql('this is some text');
		should(bar.getTitle()).eql('this is some text');
		bar.title = 'other text';
		should(bar.title).eql('other text');
		should(bar.getTitle()).eql('other text');
	});

	it('titleid', function () {
		var bar = Ti.UI.createAlertDialog({
			titleid: 'this-is-my-key'
		});
		should(bar.titleid).be.a.String;
		should(bar.getTitleid).be.a.Function;
		should(bar.titleid).eql('this-is-my-key');
		should(bar.getTitleid()).eql('this-is-my-key');
		should(bar.title).eql('this is my value');
		bar.titleid = 'other text';
		should(bar.titleid).eql('other text');
		should(bar.getTitleid()).eql('other text');
		should(bar.title).eql('other text'); // key is used when no resources found
	});

	it('message', function () {
		var bar = Ti.UI.createAlertDialog({
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

	it('buttonNames', function () {
		var bar = Ti.UI.createAlertDialog({
		});
		should(bar.buttonNames).be.an.Array;
		should(bar.getButtonNames).be.a.Function;
		should(bar.buttonNames).be.empty;
		should(bar.getButtonNames()).be.empty;
		bar.buttonNames = ['this','other'];
		should(bar.buttonNames.length).eql(2);
		should(bar.getButtonNames().length).eql(2);
	});

	it('', function (finish) {
		var bar = Ti.UI.createAlertDialog({
		});
		should(bar.cancel).be.a.Number;
		should(bar.getCancel).be.a.Function;
		bar.cancel = 1;
		should(bar.cancel).eql(1);
		should(bar.getCancel()).eql(1);
	});

});
