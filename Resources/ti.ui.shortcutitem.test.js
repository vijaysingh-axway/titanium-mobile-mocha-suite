/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
/* eslint no-undef: "off" */
'use strict';

const should = require('./utilities/assertions');

describe.android('Titanium.UI.ShortcutItem', () => {

	it('Ti.UI.ShortcutItem', () => {
		should(Ti.UI.ShortcutItem).not.be.undefined();
	});

	it('createShortcutItem', () => {
		should(Ti.UI.createShortcutItem).not.be.undefined();
		should(Ti.UI.createShortcutItem).be.a.Function();
	});

	it('basic shortcut item', () => {
		// Create shortcut item.
		const item = Ti.UI.createShortcutItem({
			id: 'test_shortcut',
			title: 'Test Shortcut',
			description: 'Test shortcut description',
			data: { test_data: 'data' }
		});
		should(item).be.an.Object();

		// Verify `apiName`.
		should(item).have.readOnlyProperty('apiName').which.is.a.String();
		should(item.apiName).be.eql('Ti.UI.ShortcutItem');

		// Verify `id`.
		should(item.id).be.eql('test_shortcut');

		// Verify `title`.
		should(item.title).be.eql('Test Shortcut');

		// Verify `description`.
		should(item.description).be.eql('Test shortcut description');

		// Verify `data`.
		should(item.data).be.a.Object();
	});

	it.android('createShortcutItem', () => {
		// create shortcut
		const shortcut = Ti.UI.createShortcutItem({
			id: 'test_shortcut',
			title: 'Test Shortcut',
			description: 'Test shortcut description',
			icon: Ti.Android.R.drawable.ic_menu_send
		});

		// ONLY compatible with Android 7.1+, end test early
		const version = Ti.Platform.version.split('.');
		if (parseInt(`${version[0]}${version[1]}`) < 71) {
			return;
		}

		// verify `id`
		should(shortcut.id).be.eql('test_shortcut');

		// verify `title`
		should(shortcut.title).be.eql('Test Shortcut');

		// verify `description`
		should(shortcut.description).be.eql('Test shortcut description');

		// verify `icon`
		should(shortcut.icon).be.eql(Ti.Android.R.drawable.ic_menu_send);

		// verify `show()`
		should(shortcut.show).not.be.undefined();
		should(shortcut.show).be.a.Function();

		// verify `hide()`
		should(shortcut.hide).not.be.undefined();
		should(shortcut.hide).be.a.Function();

		// verify `pin`
		should(shortcut.pin).not.be.undefined();
		should(shortcut.pin).be.a.Function();
	});

	it.android('handle duplicate shortcuts', () => {
		for (let i = 0; i < 16; i++) {
			const shortcut = Ti.UI.createShortcutItem({
				id: 'test_shortcut',
				title: 'Test Shortcut',
				description: 'Test shortcut description',
				icon: Ti.Android.R.drawable.ic_menu_send
			});
			shortcut.show();
		}
	});
});
