/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2019-Present by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
'use strict';
require('./utilities/assertions');

describe.ipad('Titanium.UI.iPad.Popover', function () {
	let win;

	this.timeout(5000);

	afterEach(function (done) {
		if (win) {
			// If `win` is already closed, we're done.
			let t = setTimeout(function () {
				if (win) {
					win = null;
					done();
				}
			}, 3000);

			win.addEventListener('close', function listener () {
				clearTimeout(t);

				if (win) {
					win.removeEventListener('close', listener);
				}
				win = null;
				done();
			});
			win.close();
		} else {
			win = null;
			done();
		}
	});

	it.iosBroken('Should pass', function (finish) {
		win = Ti.UI.createWindow({ backgroundColor: 'white' });

		const button = Ti.UI.createButton({ title: 'Open Popover!' });
		win.add(button);

		const rightButton = Ti.UI.createButton({ title: 'Robin' });

		var contentWindow = Ti.UI.createWindow({
			rightNavButton: rightButton,
			title: 'Kermit'
		});
		contentWindow.add(Ti.UI.createLabel({ text: 'It\'s not easy being green.' }));

		const popover = Ti.UI.iPad.createPopover({
			backgroundColor: 'green',
			contentView: Ti.UI.createNavigationWindow({
				width: 250,
				height: 100,
				window: contentWindow
			})
		});

		win.open();

		setTimeout(function () {
			try {
				popover.show({ view: button });
				finish();
			} catch (e) {
				finish(e);
			} finally {
				popover.hide();
			}
		}, 200);
	});
});

