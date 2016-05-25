/**
 * Copyright (c) 2015-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 * Please see the LICENSE included with this distribution for details.
 */

// TODO Let this script take command line args to:
// - point at the specific SDK to use for testing
// - specify the platform to test against
// -
var path = require('path'),
	fs = require('fs'),
	async = require('async'),
	wrench = require('wrench'),
	ejs = require('ejs'),
	spawn = require('child_process').spawn,
	SOURCE_DIR = path.join(__dirname, '..'),
	PROJECT_NAME = 'mocha',
	PROJECT_DIR = path.join(__dirname, PROJECT_NAME);

function clearPreviousApp(next) {
	// If the project already exists, wipe it
	if (fs.existsSync(PROJECT_DIR)) {
		wrench.rmdirSyncRecursive(PROJECT_DIR);
	}
	next();
}

function installSDK(sdkVersion, next) {
	var prc,
		args = ['sdk', 'install'];
	if (sdkVersion.indexOf('.') == -1) { // no period, probably mean a branch
		args.push('-b');
	}
	args.push(sdkVersion);
	args.push('-d'); // make default
	prc = spawn('titanium', args);
	prc.stdout.on('data', function (data) {
		console.log(data.toString());
	});
	prc.on('close', function (code) {
		if (code != 0) {
			next('Failed to install SDK');
		} else {
			next();
		}
	});
}

function generateProject(next) {
	var prc;
	prc = spawn('titanium', ['create', '--force', '--type', 'app', '--platforms', 'android,ios', '--name', PROJECT_NAME, '--id', 'com.appcelerator.testApp.testing', '--url', 'http://www.appcelerator.com', '--workspace-dir', __dirname, '--no-prompt']);
	prc.stdout.on('data', function (data) {
		console.log(data.toString());
	});
	prc.stderr.on('data', function (data) {
		console.log(data.toString());
	});
	prc.on('close', function (code) {
		var setProcess;
		if (code != 0) {
			next('Failed to create project');
		} else {
			next();
		}
	});
}

// Add required properties for our unit tests!
function addTiAppProperties(next) {
	var tiapp_xml = path.join(PROJECT_DIR, 'tiapp.xml');

	// Not so smart but this should work...
	var content = [];
	fs.readFileSync(tiapp_xml).toString().split(/\r?\n/).forEach(function(line) {
		content.push(line);
		if (line.indexOf('<ios>') >= 0) {
			content.push('<use-app-thinning>true</use-app-thinning>');
		}
		// TODO Have this look at the existing modules under the test app folder to inject them
		// inject the test modules for require
		else if (line.indexOf('<modules>') >= 0) {
			// FIXME The non-legacy CommonJS modules requires this PR be merged: https://github.com/appcelerator/titanium_mobile/pull/8004
			//content.push('<module version="1.0.0">commonjs.index_js</module>');
			//content.push('<module version="1.0.0">commonjs.index_json</module>');
			content.push('<module version="1.0.0">commonjs.legacy</module>');
			content.push('<module version="1.0.0">commonjs.legacy.index_js</module>');
			content.push('<module version="1.0.0">commonjs.legacy.index_json</module>');
			content.push('<module version="1.0.0">commonjs.legacy.package</module>');
			//content.push('<module version="1.0.0">commonjs.package</module>');
		}
	});
	fs.writeFileSync(tiapp_xml, content.join('\n'));

	next();
}

function copyMochaAssets(next) {
	var src = path.join(SOURCE_DIR, 'Resources'),
		dest = path.join(PROJECT_DIR, 'Resources');
	wrench.copyDirSyncRecursive(src, dest, {
		forceDelete: true
	});

	// copy modules so we can test those too
	src = path.join(SOURCE_DIR, 'modules'),
		dest = path.join(PROJECT_DIR, 'modules');
	wrench.copyDirSyncRecursive(src, dest, {
		forceDelete: true
	});

	// copy plugins so we can test those too
	src = path.join(SOURCE_DIR, 'plugins'),
		dest = path.join(PROJECT_DIR, 'plugins');
	wrench.copyDirSyncRecursive(src, dest, {
		forceDelete: true
	});
	next();
}

/**
 * Runs the iOS build and parses out the test results.
 * @param  {Function} next [description]
 */
function runIOSBuild(next) {
	var prc = spawn('titanium', ['build', '--project-dir', PROJECT_DIR, '--platform', 'ios', '--target', 'simulator', '--no-prompt', '--no-colors', '--log-level', 'info']);
	handleBuild(prc, next);
}

/**
 * unlock android emulator before ti build (needed for travis)
 * @return {[type]} [description]
 */
function unlockAndroid() {
	// FIXME We need to know the location of adb, It's unlikely to be on the PATH!
	var androidUnlock = spawn('adb', ['shell', 'input', 'keyevent', '82', '&']);
	androidUnlock.stdout.on('data', function(data) {
		console.log(data.toString());
	});
	androidUnlock.stderr.on('data', function(data) {
		console.log('Android emulator error');
		console.log(data.toString());
	});
	androidUnlock.on('close', function(code) {
		console.log('Android emulator code');
		console.log(code);
		next();
	});
}

function runAndroidBuild(next) {
	var prc;
	//unlockAndroid();
	prc = spawn('titanium', ['build', '--project-dir', PROJECT_DIR, '--platform', 'android', '--target', 'emulator', '--no-prompt', '--no-colors','--log-level', 'info']);
	handleBuild(prc, next);
}

/**
 * Once a build has been spawned off this handles grabbing the test results from the output.
 * @param  {[type]}   prc  Handle of the running process from spawn
 * @param  {Function} next [description]
 */
function handleBuild(prc, next) {
	var inResults = false,
		results,
		done = false;
	prc.stdout.on('data', function (data) {
		console.log(data.toString().trim());
		var lines = data.toString().trim().match(/^.*([\n\r]+|$)/gm);
		for (var i = 0; i < lines.length; i++) {
			var str = lines[i],
				index = -1;

			if (inResults) {
				if ((index = str.indexOf('[INFO]')) != -1) {
					str = str.slice(index + 8).trim();
				}
				if ((index = str.indexOf('!TEST_RESULTS_STOP!')) != -1) {
					str = str.slice(0, index).trim();
					inResults = false;
					done = true; // we got the results we need, when we kill this process we'll move on
				}

				results += str;
				if (done) {
					results = results.trim(); // for some reason, there's a leading space that is messing with everything!
					prc.kill();
					return next(null, results);
				}
			}
			else if ((index = str.indexOf('!TEST_RESULTS_START!')) != -1) {
				inResults = true;
				results = str.substr(index + 20).trim();
			}

			// Handle when app crashes and we haven't finished tests yet!
			if ((index = str.indexOf('-- End application log ----')) != -1) {
				prc.kill(); // quit this build...
				next('failed to get test results before log ended!'); // failed too many times
			}
		}
	});
	prc.stderr.on('data', function (data) {
		console.log(data.toString());
	});
}

function removeSDK(sdkVersion, next) {
	var prc;
	prc = spawn('titanium', ['sdk', 'uninstall', sdkVersion, '--force']);
	prc.on('close', function (code) {
		if (code != 0) {
			next('Failed to uninstall SDK');
		} else {
			next();
		}
	});
}

function killiOSSimulator(next) {
	var prc = spawn('killall', ['Simulator']);
	prc.on('close', function (code) {
		next();
	});
}

function killAndroidSimulator(next) {
//should kill genymotion
	next();
}

/**
 * Converts the raw string outut from the test app into a JSON Object.
 *
 * @param testResults {String} Raw string output from the logs of the test app
 * @param next {Function} callback function
 */
function parseTestResults(testResults, next) {
	if (!testResults) {
		return next('Failed to retrieve any tests results!');
	}

	// preserve newlines, etc - use valid JSON
	testResults = testResults.replace(/\\n/g, "\\n")
			   .replace(/\\'/g, "\\'")
			   .replace(/\\"/g, '\\"')
			   .replace(/\\&/g, "\\&")
			   .replace(/\\r/g, "\\r")
			   .replace(/\\t/g, "\\t")
			   .replace(/\\b/g, "\\b")
			   .replace(/\\f/g, "\\f");
	// remove non-printable and other non-valid JSON chars
	testResults = testResults.replace(/[\u0000-\u0019]+/g,'');
	next(null, JSON.parse(testResults));
}

/**
 * Converts JSON results of unit tests into a JUnit test result XML formatted file.
 *
 * @param jsonResults {Object} JSON containing results of the unit test output
 * @param prefix {String} prefix for test names to identify them uniquely
 * @param next {Function} callback function
 */
function outputJUnitXML(jsonResults, prefix, next) {
	// We need to go through the results and separate them out into suites!
	var suites = {},
		keys = [],
		values = [],
		r = '';
	jsonResults.results.forEach(function(item) {
		var s = suites[item.suite] || {tests: [], suite: item.suite, duration: 0, passes: 0, failures: 0, start:''}; // suite name to group by
		s.tests.unshift(item);
		s.duration += item.duration;
		if (item.state == 'failed') {
			s.failures += 1;
		} else if (item.state == 'passed') {
			s.passes += 1;
		}
		suites[item.suite] = s;
	});
	keys = Object.keys(suites);
	values = keys.map(function(v) { return suites[v]; });
	var r = ejs.render('' + fs.readFileSync(path.join('.', 'junit.xml.ejs')),  { 'suites': values, 'prefix': prefix });

	// Write the JUnit XML to a file
	fs.writeFileSync(path.join(DIST_DIR, 'junit.' + prefix + '.xml'), r);
	next();
}

/**
 * Finds the existing SDK, Scons the new SDK, install the new SDK ,generates a Titanium mobile project,
 * sets up the project, copies unit tests into it from ti_mocha_tests, and then runs the project in a ios simulator
 * and android emulator which will run the mocha unit tests. The test results are piped to
 * the CLI. If any unit test fails, process exits with a fail. After which the API coverage is calculated. If the coverage
 * falls below the previous build, process exits with a fail.
 */
function test(sdkVersion, callback) {
	var iOSResults,
		androidResults;
	async.series([
		function (next) {
			// in parallel we can:
			// clean up old app
			// install SDK
			// TODO Kill iOS simulator?
			async.parallel([
				function (cb) {
					console.log('Install SDK');
					installSDK(sdkVersion, cb);
				},
				function (cb) {
					clearPreviousApp(cb);
				}
			], next);
		},
		function (next) {
			console.log('Generating project');
			generateProject(next);
		},
		function (next) {
			console.log('Adding properties for tiapp.xml');
			addTiAppProperties(next);
		},
		function (next) {
			console.log('Copying assets into project');
			copyMochaAssets(next);
		},
		// TODO Specify the platform we want to test rather than hard-code Android then iOS?
		function (next) {
			console.log('Launching android test project in emulator');
			runAndroidBuild(function (err, result) {
				if (err) {
					return next(err);
				}
				androidResults = result;
				next();
			});
		},
		function (next) {
			parseTestResults(androidResults, function(err, parsed) {
				if (err) {
					return next(err);
				}
				androidResults = parsed;
				next();
			});
		},
		function (next) {
			outputJUnitXML(androidResults, 'android', next);
		},
		function (next) {
			// FIXME iOS prompts for access to contacts in UI! We need to find some way to 'click' OK for user...
			// FIXME When an assertion fails, iOS opens the 'red screen of death' and WILL NOT open other views. We need to dismiss the error view! (or set some property to avoid it?)
			console.log('Launching ios test project in simulator');
			runIOSBuild(function (err, result) {
				if (err) {
					return next(err);
				}
				iOSResults = result;
				next();
			});
		},
		function (next) {
			parseTestResults(iOSResults, function(err, parsed) {
				if (err) {
					return next(err);
				}
				iOSResults = parsed;
				next();
			});
		},
		function (next) {
			outputJUnitXML(iOSResults, 'ios', next);
		}
	], function(err) {
		callback(err, {
			ios: iOSResults,
			android: androidResults
		});
	});
}

// public API
exports.test = test;
// TODO Expose method to clean SDK up so we can run after?
//

// When run as single script.
if (module.id === '.') {
	test('master', function(err, results) {
		if (err) {
			console.error(err.toString().red);
			process.exit(1);
		} else {
			// TODO Do something with the results!
			process.exit(0);
		}
	});
}
