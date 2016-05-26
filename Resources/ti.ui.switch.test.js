/*
 * Appcelerator Titanium Mobile
 * Copyright (c) 2015-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

var should = require('./should');

describe('Titanium.UI.Switch', function () {
    it('Ti.UI.Switch', function (finish) {
        should(Ti.UI.Switch).not.be.undefined;
        finish();
    });

    it('apiName', function (finish) {
        // See https://jira.appcelerator.org/browse/TIMOB-23346
        if (Ti.Platform.osname === 'windowsstore' || Ti.Platform.osname === 'windowsphone') {
            should(Ti.UI.Switch.apiName).be.eql('Titanium.UI.Switch');
        } else {
            should(Ti.UI.Switch.apiName).be.eql('Ti.UI.Switch');
        }
        finish();
    });

    it('createSwitch', function (finish) {
        should(Ti.UI.createSwitch).not.be.undefined;
        should(Ti.UI.createSwitch).be.a.Function;

        // Create switch
        var switch_ctrl = Ti.UI.createSwitch({value : true});
        should(switch_ctrl).be.a.Object;
        should(switch_ctrl.apiName).be.a.String;
        should(switch_ctrl.apiName).be.eql("Titanium.UI.Switch");

        // Validate switch value
        Ti.API.info('Switch value : '+switch_ctrl.value);
        should(switch_ctrl.value).be.eql(true);
        switch_ctrl.value = false;
        should(switch_ctrl.value).be.eql(false);

        finish();
    });

});
