/* eslint-env node */
/* eslint no-unused-vars: "off" */

// local variables and functions which should not be exported
var localVariable = 'localVariable';
var localFunction = function () { // eslint-disable-line func-style
	return 'localFunction';
};

// public functions which should be exported
exports.testFunc0 = function () {
	return 'testFunc0';
};
exports.testFunc1 = function (arg1) {
	return 'testFunc1 ' + arg1;
};
exports.testFunc2 = function (arg1, arg2) {
	return 'testFunc2 ' + arg1 + ' ' + arg2;
};

// test for internal __filename
exports.filename = __filename;
exports.dirname = __dirname;

// public variables which should be exported
exports.testStrVar = 'testVar0';
exports.testNumVar = 101;
exports.testBoolVar = true;
exports.testNullVar = null;

// these are actually a side effect, but we can hang things off the global object
// NOTE: Titanium used to support "this" as global too, but babel transpile breaks that
global.globalFunctionFromModule = function () {
	return 'globalFunctionFromModule';
};
global.globalStrVarFromModule = 'globalStrVarFromModule';
