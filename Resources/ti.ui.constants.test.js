/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
var should = require('./should'),
	assert = require('./utilities/assertions');

describe('Titanium.UI', function () {

	var constantNumbers = [
		'UNKNOWN', 'PORTRAIT', 'UPSIDE_PORTRAIT', 'LANDSCAPE_LEFT', 'LANDSCAPE_RIGHT',
		'FACE_UP', 'FACE_DOWN',
		'RETURNKEY_GO', 'RETURNKEY_GOOGLE', 'RETURNKEY_JOIN', 'RETURNKEY_NEXT', 'RETURNKEY_ROUTE', 'RETURNKEY_SEARCH', 'RETURNKEY_YAHOO', 'RETURNKEY_DONE', 'RETURNKEY_EMERGENCY_CALL', 'RETURNKEY_DEFAULT', 'RETURNKEY_SEND',
		'KEYBOARD_APPEARANCE_DEFAULT', 'KEYBOARD_APPEARANCE_ALERT',
		'KEYBOARD_ASCII', 'KEYBOARD_NUMBERS_PUNCTUATION', 'KEYBOARD_URL', 'KEYBOARD_NUMBER_PAD', 'KEYBOARD_PHONE_PAD', 'KEYBOARD_EMAIL', 'KEYBOARD_NAMEPHONE_PAD', 'KEYBOARD_DEFAULT', 'KEYBOARD_DECIMAL_PAD',
		'AUTOLINK_EMAIL_ADDRESSES', 'AUTOLINK_MAP_ADDRESSES', 'AUTOLINK_PHONE_NUMBERS', 'AUTOLINK_URLS', 'AUTOLINK_NONE', 'AUTOLINK_ALL',
		'INPUT_BORDERSTYLE_NONE', 'INPUT_BORDERSTYLE_ROUNDED', 'INPUT_BORDERSTYLE_BEZEL', 'INPUT_BORDERSTYLE_LINE', 'INPUT_BUTTONMODE_ONFOCUS', 'INPUT_BUTTONMODE_ALWAYS', 'INPUT_BUTTONMODE_NEVER'
		'LIST_ITEM_TEMPLATE_DEFAULT',
		'LIST_ACCESSORY_TYPE_NONE', 'LIST_ACCESSORY_TYPE_CHECKMARK', 'LIST_ACCESSORY_TYPE_DETAIL', 'LIST_ACCESSORY_TYPE_DISCLOSURE',
		'TEXT_ALIGNMENT_LEFT', 'TEXT_ALIGNMENT_CENTER', 'TEXT_ALIGNMENT_RIGHT',
		'TEXT_VERTICAL_ALIGNMENT_BOTTOM', 'TEXT_VERTICAL_ALIGNMENT_CENTER', 'TEXT_VERTICAL_ALIGNMENT_TOP',
		'PICKER_TYPE_PLAIN', 'PICKER_TYPE_TIME', 'PICKER_TYPE_DATE' 'PICKER_TYPE_DATE_AND_TIME', 'PICKER_TYPE_COUNT_DOWN_TIMER',
		'TEXT_AUTOCAPITALIZATION_NONE', 'TEXT_AUTOCAPITALIZATION_SENTENCES', 'TEXT_AUTOCAPITALIZATION_WORDS', 'TEXT_AUTOCAPITALIZATION_ALL'
	];
	var constantStrings = ['UNIT_PX', 'UNIT_MM', 'UNIT_CM', 'UNIT_IN', 'UNIT_DIP'];

	// verify our constant Numbers
	for (var i = 0; i < constantNumbers.length; i++) {
		it(constantNumbers[i], function (finish) {
			should(Ti.UI[constantNumbers[i]]).be.a.readOnlyNumber;
			finish();
		});
	}
	// Verify our constant Strings
	for (var i = 0; i < constantStrings.length; i++) {
		it(constantStrings[i], function (finish) {
			should(Ti.UI[constantStrings[i]]).be.a.readOnlyString;
			finish();
		});
	}
});
