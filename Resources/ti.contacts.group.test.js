/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2015-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Contacts.Group', function() {
	it('apiName', function () {
		should(Ti.Contacts.Group).have.a.readOnlyProperty('apiName').which.is.a.String;
		should(Ti.Contacts.Group.apiName).be.eql('Ti.Contacts.Group');
	});

	it('identifier', function () {
		should(function () {
			var group = Ti.Contacts.createGroup();
			// must call Ti.Contacts.save to write group!
			should(group.identifier).not.be.undefined;
			//should(group.identifier).be.a.String; // null until saved?
			// TODO Test read-only
		}).not.throw();
	});

	it('name', function () {
		should(function () {
			var group = Ti.Contacts.createGroup({name: 'example'});
			should(group.name).not.be.undefined;
			should(group.name).be.a.String;
			// TODO Test modifying the name
		}).not.throw();
	});

	it('recordId', function () {
		should(function () {
			var group = Ti.Contacts.createGroup();
			should(group.recordId).not.be.undefined;
			// must call Ti.Contacts.save first to get recordId?
			//should(group.recordId).be.a.Number;
			// TODO Number on iOS, String on Windows?
		}).not.throw();
	});

	it('add', function() {
		 should(function () {
			var group = Ti.Contacts.createGroup();
			should(group.add).be.a.Function;
			// TODO Test the method
			// Handle null/undefined as arg
			// test non-Person as arg
			// test calling without any args
		}).not.throw();
	});

	it('members', function() {
		 should(function () {
			var group = Ti.Contacts.createGroup();
			should(group.members).be.a.Function;
			should(group.members()).be.an.Array;
			// TODO Test the method
		}).not.throw();
	});

	it('remove', function() {
		 should(function () {
			var group = Ti.Contacts.createGroup();
			should(group.remove).be.a.Function;
			// TODO Test the method
			// Handle null/undefined as arg
			// test non-Person as arg
			// test calling without any args
		}).not.throw();
	});

	it('sortedMembers', function() {
		 should(function () {
			var group = Ti.Contacts.createGroup();
			should(group.sortedMembers).be.a.Function;
			should(group.sortedMembers(Ti.Contacts.CONTACTS_SORT_LAST_NAME)).be.an.Array;
			// TODO Test the method
			// Test non Ti.Contants.CONTACTS_SORT values as arg

		}).not.throw();
	});
});
