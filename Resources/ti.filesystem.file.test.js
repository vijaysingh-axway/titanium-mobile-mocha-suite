/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2011-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var should = require('./should'),
	utilities = require('./utilities/utilities'),
	assert = require('./utilities/assertions');

describe('Titanium.Filesystem.File', function () {
	it('apiName', function (finish) {
		should(Ti.Filesystem.File.apiName).be.eql('Ti.Filesystem.File');
		finish();
	});

	// Check if name exists and returns string
	it('name', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.name).be.a.readOnlyString;
		should(file.name).be.eql('app.js');
		finish();
	});

	// Check if nativePath exists and returns string
	it('nativePath', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.nativePath).be.a.readOnlyString;
		finish();
	});

	// Check if resolve exists and returns string
	it('#resolve()', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.resolve).not.be.undefined;
		should(file.resolve).be.a.Function;
		var value = file.resolve();
		should(value).not.be.undefined;
		should(value).be.a.String;
		// On Windows, it returns native path
		if (utilities.isWindows()) {
			should(value).be.eql(file.nativePath);
		}
		finish();
	});

	// Check if executable exists and returns boolean
	it('executable', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.executable).not.be.undefined;
		should(file.executable).be.a.Boolean;
		should(file.executable).be.readOnly;
		finish();
	});

	// Check if hidden exists and returns boolean
	it('hidden', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.hidden).not.be.undefined;
		should(file.hidden).be.a.Boolean;
		should(file.hidden).be.readOnly;
		finish();
	});

	// Check if readonly exists and returns boolean
	it('readonly', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.readonly).not.be.undefined;
		should(file.readonly).be.a.Boolean;
		should(file.readonly).be.readOnly;
		finish();
	});

	// Check if writable exists and returns boolean
	it('writable', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.writable).not.be.undefined;
		should(file.writable).be.a.Boolean;
		should(file.writable).be.readOnly;
		finish();
	});
	// Check if symbolicLink exists and returns boolean
	it('symbolicLink', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.symbolicLink).not.be.undefined;
		should(file.symbolicLink).be.a.Boolean;
		should(file.symbolicLink).be.readOnly;
		finish();
	});

	// Check if parent exists and returns File
	it('parent', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.parent).be.ok; // not null or undefined. should(file).not.be.null causes a stack overflow somehow.
		finish();
	});

	// Check if size exists and returns number
	it('size', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.size).be.a.readOnlyNumber;
		should(file.size > 0).be.true;
		finish();
	});

	// exists should return true if file exists
	it('#exists() returns true for existing file', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.exists()).be.true;
		finish();
	});

	// exists should return false if file is not there
	it('#exists() returns false for non-existent file', function (finish) {
		var file = Ti.Filesystem.getFile('appp.js');
		should(file.exists()).be.false;
		finish();
	});

	// isFile should return true if file exists
	it('#isFile() returns true for an existing file', function(finish) {
		var file = Ti.Filesystem.getFile('app.js');
		should(file.exists()).be.true;
		should(file.isFile()).be.true;
		finish();
	});

	// isFile should return false if file is not there
	it('#isFile() returns false for a file that doesn\'t exist', function (finish) {
		var file = Ti.Filesystem.getFile('appp.js');
		should(file.exists()).be.false;
		should(file.isFile()).be.false;
		finish();
	});

	// isFile should return false if file points to directory
	it('#isFile() returns false for a directory', function (finish) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory);
		should(dir.isFile()).be.false;
		finish();
	});

	// isDirectory should return true if file points to directory
	it('#isDirectory() retruns true for directory that exists', function (finish) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory);
		should(dir.isDirectory()).be.true;
		finish();
	});

	// isDirectory should return false if file points to file
	it('#isDirectory() returns false for a file that exists', function (finish) {
		var dir = Ti.Filesystem.getFile('app.js');
		should(dir.isDirectory()).be.false;
		finish();
	});

	// isDirectory should return false if file is not there
	it('#isDirectory() returns false for directory that doesn\'t exist', function (finish) {
		var dir = Ti.Filesystem.getFile('appp');
		should(dir.isDirectory()).be.false;
		finish();
	});

	// createTimestamp should return number
	it('#createTimestamp()', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		var create_date = file.createTimestamp();
		should(create_date).be.a.Number;
		if (utilities.isAndroid()) { // Android returns 0 for createTimestamp
			should(create_date).eql(0);
		} else {
			should(create_date > 0).be.true;
		}
		finish();
	});

	// modificationTimestamp should return number
	it('#modificationTimestamp()', function (finish) {
		var file = Ti.Filesystem.getFile('app.js');
		var mod_date = file.modificationTimestamp();
		should(mod_date).be.a.Number;
		if (utilities.isAndroid()) { // Android returns 0 for createTimestamp
			should(mod_date).eql(0);
		} else {
			should(mod_date > 0).be.true;
		}
		finish();
	});

	// createDirectory and deleteDirectory
	it('create_and_deleteDirectory', function (finish) {
		var newDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mydir');
		should(newDir.exists()).be.false;
		newDir.createDirectory();
		should(newDir.exists()).be.true;
		should(newDir.deleteDirectory()).be.true;
		should(newDir.exists()).be.false;
		finish();
	});

	// recursive deleteDirectory
	it('deleteDirectory_recursive', function (finish) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'testDir');
		should(dir.exists()).be.false;
		should(dir.createDirectory()).be.true;
		should(dir.exists()).be.true;

		var file = Ti.Filesystem.getFile(dir.resolve(), 'test.txt');
		should(file.exists()).be.false;
		should(file.write('Appcelerator')).be.true;
		should(file.exists()).be.true;

		var subDir = Ti.Filesystem.getFile(dir.resolve(), 'subDir');
		should(subDir.exists()).be.false;
		should(subDir.createDirectory()).be.true;
		should(subDir.exists()).be.true;

		var subFile = Ti.Filesystem.getFile(subDir.resolve(), 'subTest.txt');
		should(subFile.exists()).be.false;
		should(subFile.write('Appcelerator')).be.true;
		should(subFile.exists()).be.true;

		should(dir.deleteDirectory(true)).be.true;
		should(dir.exists()).be.false;

		finish();
	});

	// createFile and deleteFile
	it('createFile_and_deleteFile', function (finish) {
		var newFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'myfile');
		should(newFile.exists()).be.false;
		newFile.createFile();
		should(newFile.exists()).be.true;
		newFile.deleteFile();
		should(newFile.exists()).be.false;
		finish();
	});

	// File.read
	it('#read()', function (finish) {
		var newFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js');
		should(newFile.exists()).be.true;
		var blob = newFile.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		finish();
	});

	// File.write from String
	it('write_String', function (finish) {
		var msg = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(msg.write('Appcelerator', false)).be.true;
		should(msg.exists()).be.true;

		var blob = msg.read();
		should(blob).be.ok; // not null or undefined
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('Appcelerator');

		should(msg.deleteFile()).be.true;
		should(msg.exists()).be.false;
		finish();
	});

	// File.write from String (append)
	it('write_String_append', function (finish) {
		var msg = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(msg.write('Appcelerator', false)).be.true;
		should(msg.exists()).be.true;

		should(msg.write('Appcelerator', true)).be.true;

		var blob = msg.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(msg.deleteFile()).be.true;
		should(msg.exists()).be.false;
		finish();
	});

	// File.write from File
	it('write_File', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write(from, false)).be.true;
		should(to.exists()).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('Appcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.write from File (append)
	it('write_File_append', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write('Appcelerator', false)).be.true;
		should(to.exists()).be.true;

		should(to.write(from, true)).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.write from Blob
	it('write_Blob', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write(from.read(), false)).be.true;
		should(to.exists()).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('Appcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.write from Blob (append)
	it('write_Blob_append', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write('Appcelerator', false)).be.true;
		should(to.exists()).be.true;

		should(to.write(from.read(), true)).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.append String
	it('append_String', function (finish) {
		var msg = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(msg.write('Appcelerator', false)).be.true;
		should(msg.exists()).be.true;

		should(msg.append('Appcelerator')).be.true;

		var blob = msg.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(msg.deleteFile()).be.true;
		should(msg.exists()).be.false;
		finish();
	});

	// File.append File
	it('append_File', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write('Appcelerator', false)).be.true;
		should(to.exists()).be.true;

		should(to.append(from)).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.append Blob
	it('append_Blob', function (finish) {
		var from = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test.txt');
		should(from.write('Appcelerator', false)).be.true;
		should(from.exists()).be.true;

		var to = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'write_test_to.txt');
		should(to.write('Appcelerator', false)).be.true;
		should(to.exists()).be.true;

		should(to.append(from.read())).be.true;

		var blob = to.read();
		should(blob).be.ok; // not null or undefined.
		should(blob.size > 0).be.true;
		should(blob.text.length > 0).be.true;
		should(blob.text).be.eql('AppceleratorAppcelerator');

		should(from.deleteFile()).be.true;
		should(from.exists()).be.false;
		should(to.deleteFile()).be.true;
		should(to.exists()).be.false;

		finish();
	});

	// File.open
	it('open', function (finish) {
		var newFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js');
		should(newFile.exists()).be.true;
		var stream = newFile.open(Ti.Filesystem.MODE_READ);
		should(stream).be.ok; // not null or undefined.
		stream.close();
		finish();
	});

	// File.spaceAvailable
	it('#spaceAvailable()', function (finish) {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js');
		should(file.exists()).be.true;
		var space = file.spaceAvailable();
		should(space).be.a.Number;
		should(space > 0).be.true;
		finish();
	});

	// File.copy
	it('copy', function (finish) {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js');
		should(file.exists()).be.true;
		var newpath = Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + 'app.js';
		should(file.copy(newpath)).be.true;
		var dest = Ti.Filesystem.getFile(newpath);
		should(dest.exists()).be.true;
		should(dest.deleteFile()).be.true;
		should(dest.exists()).be.false;
		finish();
	});

	// File copy and move
	it('copy_move', function (finish) {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js');
		should(file.exists()).be.true;

		var dest1 = Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + 'app.js';
		var dest2 = Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + 'appp.js';

		should(file.copy(dest1)).be.a.Boolean;

		var copy = Ti.Filesystem.getFile(dest1);
		should(copy.exists()).be.true;
		should(copy.move(dest2)).be.a.true;
		should(copy.exists()).be.false;
		var move = Ti.Filesystem.getFile(dest2);
		should(move.exists()).be.true;
		should(move.deleteFile()).be.true;
		should(move.exists()).be.false;

		finish();
	});

	// Directory listing
	it('#directoryListing()', function (finish) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory);
		should(dir.exists()).be.true;
		should(dir.getDirectoryListing).be.a.Function;
		var files = dir.getDirectoryListing();
		should(files).be.an.Array;
		finish();
	});


	// TIMOB-19128
	it('createDirectory_is_recursive', function (finish) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'sub', 'dir2');
		should(dir.exists()).be.false;
		should(dir.createDirectory()).be.true;
		should(dir.exists()).be.true;
		should(dir.deleteDirectory()).be.true;
		should(dir.exists()).be.false;

		finish();
	});

	// TIMOB-14364
	(utilities.isIOS() ? it : it.skip)('#setRemoteBackup()', function (finish) {
		should(function () {
			Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory).setRemoteBackup(false);
		}).not.throw();
		finish();
	});
});
