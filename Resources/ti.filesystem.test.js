/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Filesystem', function () {
	it('apiName', function () {
		should(Ti.Filesystem.apiName).be.eql('Ti.Filesystem');
		should(Ti.Filesystem.apiName).be.a.readOnlyString;
	});

	// Android doesn't support Ti.Filesystem.applicationDirectory
	(utilities.isAndroid() ? it.skip : it)('applicationDirectory', function () {
		should(Ti.Filesystem.applicationDirectory).be.a.readOnlyString;
	});

	it('applicationDataDirectory', function () {
		should(Ti.Filesystem.applicationDataDirectory).be.a.readOnlyString;
	});

	it('resourcesDirectory', function () {
		should(Ti.Filesystem.resourcesDirectory).be.a.readOnlyString;
	});

	it('resRawDirectory', function () {
		if (utilities.isAndroid()) {
			should(Ti.Filesystem.resRawDirectory).be.a.readOnlyString;
		} else {
			should(Ti.Filesystem.resRawDirectory).be.undefined;
		}
	});

	// On Windows Runtime, applicationSupportDirectory may return null if app doesn't have permission
	// although it should not throw exception
	it('applicationSupportDirectory', function () {
		if (!utilities.isAndroid()) {
			should(function () {
				should(Ti.Filesystem.applicationSupportDirectory).not.be.undefined;
				if (Ti.Filesystem.applicationSupportDirectory != null) {
					should(Ti.Filesystem.applicationSupportDirectory).be.a.String;
				}
				should(Ti.Filesystem.applicationSupportDirectory).be.readOnly;
			}).not.throw();
		}
	});

	// On Windows Runtime, externalStorageDirectory may return null if app doesn't have permission
	// although it should not throw exception
	it('externalStorageDirectory', function () {
		if (!utilities.isIOS()) {
			should(function () {
				should(Ti.Filesystem.externalStorageDirectory).not.be.undefined;
				if (Ti.Filesystem.externalStorageDirectory != null) {
					should(Ti.Filesystem.externalStorageDirectory).be.a.String;
				}
				should(Ti.Filesystem.externalStorageDirectory).be.readOnly;
			}).not.throw();
		}
	});

	it('applicationCacheDirectory', function () {
		// Windows Store app doesn't support cache directory
		if (utilities.isWindowsDesktop()) {
			should(Ti.Filesystem.applicationCacheDirectory).be.undefined;
		} else {
			should(Ti.Filesystem.applicationCacheDirectory).be.a.readOnlyString;
		}
	});

	it('tempDirectory', function () {
		should(Ti.Filesystem.tempDirectory).be.a.readOnlyString;
	});

	it('separator', function () {
		should(function () {
			should(Ti.Filesystem.separator).not.be.undefined;
			should(Ti.Filesystem.separator).be.a.String;
			if (utilities.isWindows()) {
				should(Ti.Filesystem.separator).be.eql('\\');
			} else {
				should(Ti.Filesystem.separator).be.eql('/');
			}
			should(Ti.Filesystem.separator).be.readOnly;
		}).not.throw();
	});

	it('lineEnding', function () {
		should(function () {
			should(Ti.Filesystem.lineEnding).not.be.undefined;
			should(Ti.Filesystem.lineEnding).be.a.String;
			if (utilities.isWindows()) {
				should(Ti.Filesystem.lineEnding).be.eql('\r\n');
			} else {
				should(Ti.Filesystem.lineEnding).be.eql('\n');
			}
			should(Ti.Filesystem.lineEnding).be.readOnly;
		}).not.throw();
	});

	it('MODE_APPEND', function () {
		should(Ti.Filesystem.MODE_APPEND).be.a.readOnlyNumber;
	});

	it('MODE_READ', function () {
		should(Ti.Filesystem.MODE_READ).be.a.readOnlyNumber;
	});

	it('MODE_WRITE', function () {
		should(Ti.Filesystem.MODE_WRITE).be.a.readOnlyNumber;
	});

	it('getFile()', function (finish) {
		should(Ti.Filesystem.getFile).not.be.undefined;
		should(Ti.Filesystem.getFile).be.a.Function;
		var file = Ti.Filesystem.getFile('app.js');
		should(file).be.ok; // not null or undefined. should(file).not.be.null causes a stack overflow somehow.
	});

	it('openStream()', function () {
		should(Ti.Filesystem.openStream).not.be.undefined;
		should(Ti.Filesystem.openStream).be.a.Function;
		var stream = Ti.Filesystem.openStream(Ti.Filesystem.MODE_READ, 'app.js');
		should(stream).be.ok; // not null or undefined. should(stream).not.be.null causes a stack overflow somehow.
		stream.close();
	});

	it('createTempDirectory()', function () {
		should(Ti.Filesystem.createTempDirectory).not.be.undefined;
		should(Ti.Filesystem.createTempDirectory).be.a.Function;
		var dir = Ti.Filesystem.createTempDirectory();
		should.exist(dir);
		should.exist(dir.name);
		should(dir.exists()).be.true;
		should(dir.deleteDirectory()).be.true;
		should(dir.exists()).be.false;
	});

	// Check if createTempFile exists and make sure it does not throw exception
	it('createTempFile()', function () {
		should(Ti.Filesystem.createTempFile).not.be.undefined;
		should(Ti.Filesystem.createTempFile).be.a.Function;
		var file = Ti.Filesystem.createTempFile();
		should(file).be.ok; // not null or undefined. should(file).not.; causes a stack overflow somehow.
		should(file.name).be.a.String;
		should(file.exists()).be.true;
		should(file.deleteFile()).be.true;
		should(file.exists()).be.false;
	});

	// TIMOB-10107
	it.skip('multiLingualFilename', function() {
		var msg = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '網上廣東話輸入法.txt');
		should(msg.write('Appcelerator', true)).be.true;
		should(msg.exists()).be.true;
		should(msg.deleteFile()).be.true;
		should(msg.exists()).be.false;
	});
});
