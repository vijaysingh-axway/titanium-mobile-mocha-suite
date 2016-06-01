/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.UI.EmailDialog', function () {
	it('apiName', function (finish) {
		should(Ti.UI.EmailDialog.apiName).be.eql('Ti.UI.EmailDialog');
		finish();
	});

	// Check if FAILED exists and make sure it does not throw exception
	it('FAILED', function (finish) {
		should(Ti.UI.EmailDialog.FAILED).be.a.readOnlyNumber;
		finish();
	});

	// Check if SENT exists and make sure it does not throw exception
	it('SENT', function (finish) {
		should(Ti.UI.EmailDialog.SENT).be.a.readOnlyNumber;
		finish();
	});
	// Check if SAVED exists and make sure it does not throw exception
	it('SAVED', function (finish) {
		should(Ti.UI.EmailDialog.SAVED).be.a.readOnlyNumber;
		finish();
	});

	// Check if CANCELLED exists and make sure it does not throw exception
	it('CANCELLED', function (finish) {
		should(Ti.UI.EmailDialog.CANCELLED).be.a.readOnlyNumber;
		finish();
	});

	(utilities.isWindowsDesktop() ? it.skip : it)('subject', function (finish) {
		var email = Ti.UI.createEmailDialog({
			subject: 'this is some text'
		});
		should(email.subject).be.a.String;
		should(email.getSubject).be.a.Function;
		should(email.subject).eql('this is some text');
		should(email.getSubject()).eql('this is some text');
		email.subject = 'other text';
		should(email.subject).eql('other text');
		should(email.getSubject()).eql('other text');
		finish();
	});

	(utilities.isWindowsDesktop() ? it.skip : it)('messageBody', function (finish) {
		var email = Ti.UI.createEmailDialog({
			messageBody: 'this is some text'
		});
		should(email.messageBody).be.a.String;
		should(email.getMessageBody).be.a.Function;
		should(email.messageBody).eql('this is some text');
		should(email.getMessageBody()).eql('this is some text');
		email.messageBody = 'other text';
		should(email.messageBody).eql('other text');
		should(email.getMessageBody()).eql('other text');
		finish();
	});

	(utilities.isWindowsDesktop() ? it.skip : it)('toRecipients', function (finish) {
		var email = Ti.UI.createEmailDialog({
			toRecipients: ['me@example.com']
		});
		should(email.toRecipients).be.a.Array;
		should(email.getToRecipients).be.a.Function;
		should(email.toRecipients).eql(['me@example.com']);
		should(email.getToRecipients()).eql(['me@example.com']);
		email.toRecipients = ['other@example.com'];
		should(email.toRecipients).eql(['other@example.com']);
		should(email.getToRecipients()).eql(['other@example.com']);
		finish();
	});

	(utilities.isWindowsDesktop() ? it.skip : it)('ccRecipients', function (finish) {
		var email = Ti.UI.createEmailDialog({
			ccRecipients: ['me@example.com']
		});
		should(email.ccRecipients).be.a.Array;
		should(email.getCcRecipients).be.a.Function;
		should(email.ccRecipients).eql(['me@example.com']);
		should(email.getCcRecipients()).eql(['me@example.com']);
		email.ccRecipients = ['other@example.com'];
		should(email.ccRecipients).eql(['other@example.com']);
		should(email.getCcRecipients()).eql(['other@example.com']);
		finish();
	});

	(utilities.isWindowsDesktop() ? it.skip : it)('bccRecipients', function (finish) {
		var email = Ti.UI.createEmailDialog({
			bccRecipients: ['me@example.com']
		});
		should(email.bccRecipients).be.a.Array;
		should(email.getBccRecipients).be.a.Function;
		should(email.bccRecipients).eql(['me@example.com']);
		should(email.getBccRecipients()).eql(['me@example.com']);
		email.bccRecipients = ['other@example.com'];
		should(email.bccRecipients).eql(['other@example.com']);
		should(email.getBccRecipients()).eql(['other@example.com']);
		finish();
	});
});
