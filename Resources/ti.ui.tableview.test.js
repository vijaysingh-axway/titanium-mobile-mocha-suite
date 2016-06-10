/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2015-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var should = require('./utilities/assertions'),
	utilities = require('./utilities/utilities'),
	didFocus = false;

describe('Titanium.UI.TableView', function () {

	beforeEach(function() {
		didFocus = false;
	});

	it('Ti.UI.TableView', function () {
		should(Ti.UI.TableView).not.be.undefined;
	});

	// FIXME iOS gives wrong apiName for row object
	(utilities.isIOS() ? it.skip : it)('createTableView', function () {

		// Validate createTableView()
		should(Ti.UI.createTableView).not.be.undefined;
		should(Ti.UI.createTableView).be.a.Function;

		// Validate createTableViewSection()
		should(Ti.UI.createTableViewSection).not.be.undefined;
		should(Ti.UI.createTableViewSection).be.a.Function;

		// Validate createTableViewRow()
		should(Ti.UI.createTableViewRow).not.be.undefined;
		should(Ti.UI.createTableViewRow).be.a.Function;

		// Create TableView section
		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		should(section_0).be.a.Object;
		should(section_0.apiName).be.a.String;
		should(section_0.apiName).be.eql('Ti.UI.TableViewSection');

		// Create and add two rows to the section
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		// Validate section rowCount
		should(section_0.rowCount).be.eql(3);

		// Validate a section row title
		should(section_0.rows[0].title).be.eql('Red');

		// Create another TableView section
		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		should(section_1).be.a.Object;

		// Create and add three rows to the section
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		// Validate section row count
		should(section_1.rowCount).be.eql(3);

		// Validate a section row title
		should(section_1.rows[2].title).be.eql('Blue');
		should(section_1.rows[2].apiName).be.a.String;
		should(section_1.rows[2].apiName).be.eql('Ti.UI.TableViewRow'); // iOS says 'Ti.View'

		// Create TableView, set data property
		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});
		should(tableView).be.a.Object;
		should(tableView.apiName).be.a.String;
		should(tableView.apiName).be.eql('Ti.UI.TableView');

		// Validate tableView section count
		should(tableView.sectionCount).be.eql(1);

		// Append another section
		tableView.appendSection(section_1);

		// Validate tableView section count
		should(tableView.sectionCount).be.eql(2);
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('insertRowAfter', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var tableView = Ti.UI.createTableView({
		  data: [ { title:'Red' } ]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');

				tableView.insertRowAfter(0, { title: 'White' });
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.insertRowAfter(0, { title: 'Purple' });
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Purple');
				should(tableView.sections[0].rows[2].title).be.eql('White');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME This crashes the app entirely on iOS. Open a JIRA ticket!
	(utilities.isIOS() ? it.skip : it)('insertRowAfter (TableViewRow)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');

				tableView.insertRowAfter(0, Ti.UI.createTableViewRow({ title: 'White' }));
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.insertRowAfter(0, Ti.UI.createTableViewRow({ title: 'Purple' }));
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Purple');
				should(tableView.sections[0].rows[2].title).be.eql('White');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('insertRowBefore', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var tableView = Ti.UI.createTableView({
		  data: [ { title:'Red' }, { title:'White' } ]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.insertRowBefore(1, { title: 'Purple' });
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Purple');
				should(tableView.sections[0].rows[2].title).be.eql('White');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('insertRowBefore (TableViewRow)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.insertRowBefore(1, Ti.UI.createTableViewRow({ title: 'Purple' }));
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Purple');
				should(tableView.sections[0].rows[2].title).be.eql('White');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('add row', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var tableView = Ti.UI.createTableView({
		  data: [ { title:'Red' } ]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');

				tableView.appendRow({ title: 'White' });
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.appendRow({ title: 'Purple' });
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('add rows', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var tableView = Ti.UI.createTableView({
			data: [ { title:'Red' } ]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');

				tableView.appendRow([ { title: 'White' }, { title: 'Purple' } ]);
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');

				tableView.appendRow({ title: 'Gray' });
				should(tableView.sections[0].rowCount).be.eql(4);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[0].rows[3].title).be.eql('Gray');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('add row (TableViewRow)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');

				tableView.appendRow(Ti.UI.createTableViewRow({ title: 'White' }));
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[1].title).be.eql('White');

				tableView.appendRow(Ti.UI.createTableViewRow({ title: 'Purple' }));
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('add row (TableViewSection)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[1].title).be.eql('White');
				section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('delete row (TableViewRow)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.an.Object;
				should(tableView.sections[0].rowCount).be.eql(3);

				should(tableView.sections[0].rows[1].title).be.eql('White');

				// delete by number
				tableView.deleteRow(1);
				should(tableView.sections[0].rowCount).be.eql(2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Purple');

				// delete by row
				tableView.deleteRow(tableView.sections[0].rows[0]);
				should(tableView.sections[0].rowCount).be.eql(1);
				should(tableView.sections[0].rows[0].title).be.eql('Purple');

				tableView.deleteRow(0);
				should(tableView.sections[0].rowCount).be.eql(0);
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('delete row (TableViewSection)', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			if (didFocus) return;
			didFocus = true;

			should(tableView.sectionCount).be.eql(1);
			should(tableView.sections[0]).be.an.Object;
			should(tableView.sections[0].rowCount).be.eql(3);

			should(tableView.sections[0].rows[1].title).be.eql('White');

			// delete by row
			section_0.remove(tableView.sections[0].rows[1]);
			should(tableView.sections[0].rowCount).be.eql(2);
			should(tableView.sections[0].rows[0].title).be.eql('Red');
			should(tableView.sections[0].rows[1].title).be.eql('Purple');

			setTimeout(function () {
				win.close();
				finish();
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME get working on iOS
	(utilities.isIOS() ? it.skip : it)('update row', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sections[0].rowCount).be.eql(3);
				tableView.updateRow(1, Ti.UI.createTableViewRow({ title: 'Green' }));
				should(tableView.sections[0].rowCount).be.eql(3);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('Green'); // iOS returns 'White' - updateRow seemed to have no effect?
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('append section', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				tableView.appendSection(section_1);
				should(tableView.sectionCount).be.eql(2);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Green');
				should(tableView.sections[1].rows[1].title).be.eql('Yellow');
				should(tableView.sections[1].rows[2].title).be.eql('Blue');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('delete section', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0, section_1]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(2);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Green');
				should(tableView.sections[1].rows[1].title).be.eql('Yellow');
				should(tableView.sections[1].rows[2].title).be.eql('Blue');

				tableView.deleteSection(1);
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');

				tableView.deleteSection(0);
				should(tableView.sectionCount).be.eql(0);
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('update section', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		var section_2 = Ti.UI.createTableViewSection({ headerTitle: 'Two' });
		section_2.add(Ti.UI.createTableViewRow({ title: 'Gray' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Pink' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Magenta' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0, section_1]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				tableView.updateSection(1, section_2);

				should(tableView.sectionCount).be.eql(2);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_2);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Gray');
				should(tableView.sections[1].rows[1].title).be.eql('Pink');
				should(tableView.sections[1].rows[2].title).be.eql('Magenta');

				tableView.deleteSection(0);
				should(tableView.sectionCount).be.eql(1);
				should(tableView.sections[0]).be.eql(section_2);
				should(tableView.sections[0].rows[0].title).be.eql('Gray');
				should(tableView.sections[0].rows[1].title).be.eql('Pink');
				should(tableView.sections[0].rows[2].title).be.eql('Magenta');

				tableView.deleteSection(0);
				should(tableView.sectionCount).be.eql(0);
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('insertSectionAfter', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		var section_2 = Ti.UI.createTableViewSection({ headerTitle: 'Two' });
		section_2.add(Ti.UI.createTableViewRow({ title: 'Gray' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Pink' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Magenta' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0, section_1]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(2);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Green');
				should(tableView.sections[1].rows[1].title).be.eql('Yellow');
				should(tableView.sections[1].rows[2].title).be.eql('Blue');
				tableView.insertSectionAfter(0, section_2);
				should(tableView.sectionCount).be.eql(3);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_2);
				should(tableView.sections[2]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Gray');
				should(tableView.sections[1].rows[1].title).be.eql('Pink');
				should(tableView.sections[1].rows[2].title).be.eql('Magenta');
				should(tableView.sections[2].rows[0].title).be.eql('Green');
				should(tableView.sections[2].rows[1].title).be.eql('Yellow');
				should(tableView.sections[2].rows[2].title).be.eql('Blue');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});

	// FIXME this test crashes ios! Fix the test or open a JIRA!
	(utilities.isIOS() ? it.skip : it)('insertSectionBefore', function (finish) {
		var win = Ti.UI.createWindow({
			backgroundColor: 'blue'
		});

		var section_0 = Ti.UI.createTableViewSection({ headerTitle: 'Zero' });
		section_0.add(Ti.UI.createTableViewRow({ title: 'Red' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'White' }));
		section_0.add(Ti.UI.createTableViewRow({ title: 'Purple' }));

		var section_1 = Ti.UI.createTableViewSection({ headerTitle: 'One' });
		section_1.add(Ti.UI.createTableViewRow({ title: 'Green' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Yellow' }));
		section_1.add(Ti.UI.createTableViewRow({ title: 'Blue' }));

		var section_2 = Ti.UI.createTableViewSection({ headerTitle: 'Two' });
		section_2.add(Ti.UI.createTableViewRow({ title: 'Gray' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Pink' }));
		section_2.add(Ti.UI.createTableViewRow({ title: 'Magenta' }));

		var tableView = Ti.UI.createTableView({
		  data: [section_0, section_1]
		});

		win.addEventListener('focus', function () {
			var error;

			if (didFocus) return;
			didFocus = true;

			try {
				should(tableView.sectionCount).be.eql(2);
				should(tableView.sections[0]).be.eql(section_0);
				should(tableView.sections[1]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Red');
				should(tableView.sections[0].rows[1].title).be.eql('White');
				should(tableView.sections[0].rows[2].title).be.eql('Purple');
				should(tableView.sections[1].rows[0].title).be.eql('Green');
				should(tableView.sections[1].rows[1].title).be.eql('Yellow');
				should(tableView.sections[1].rows[2].title).be.eql('Blue');
				tableView.insertSectionBefore(0, section_2);
				should(tableView.sectionCount).be.eql(3);
				should(tableView.sections[0]).be.eql(section_2);
				should(tableView.sections[1]).be.eql(section_0);
				should(tableView.sections[2]).be.eql(section_1);
				should(tableView.sections[0].rows[0].title).be.eql('Gray');
				should(tableView.sections[0].rows[1].title).be.eql('Pink');
				should(tableView.sections[0].rows[2].title).be.eql('Magenta');
				should(tableView.sections[1].rows[0].title).be.eql('Red');
				should(tableView.sections[1].rows[1].title).be.eql('White');
				should(tableView.sections[1].rows[2].title).be.eql('Purple');
				should(tableView.sections[2].rows[0].title).be.eql('Green');
				should(tableView.sections[2].rows[1].title).be.eql('Yellow');
				should(tableView.sections[2].rows[2].title).be.eql('Blue');
			} catch (err) {
				error = err;
			}

			setTimeout(function () {
				win.close();
				finish(error);
			}, 1000);
		});

		win.add(tableView);
		win.open();
	});
});
