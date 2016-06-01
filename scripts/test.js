/**
 * Copyright (c) 2015-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License.
 * Please see the LICENSE included with this distribution for details.
 */

var path = require('path'),
	fs = require('fs'),
	async = require('async'),
	wrench = require('wrench'),
	ejs = require('ejs'),
	StreamSplitter = require('stream-splitter'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	titanium = path.join(__dirname, 'node_modules', 'titanium', 'bin', 'titanium'),
	SOURCE_DIR = path.join(__dirname, '..'),
	PROJECT_NAME = 'mocha',
	PROJECT_DIR = path.join(__dirname, PROJECT_NAME),
	JUNIT_TEMPLATE = path.join(__dirname, 'junit.xml.ejs');

function clearPreviousApp(next) {
	// If the project already exists, wipe it
	if (fs.existsSync(PROJECT_DIR)) {
		wrench.rmdirSyncRecursive(PROJECT_DIR);
	}
	next();
}

function installSDK(sdkVersion, next) {
	var prc,
		args = [titanium, 'sdk', 'install'];
	if (sdkVersion.indexOf('.') == -1) { // no period, probably mean a branch
		args.push('-b');
	}
	args.push(sdkVersion);
	args.push('-d'); // make default
	prc = spawn('node', args);
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

/**
 * Look up the full path to the SDK we just installed (the SDK we'll be hacking
 * to add our locally built Windows SDK into).
 *
 * @param next {Function} callback function
 **/
function getSDKInstallDir(next) {
	var prc = exec('node "' + titanium + '" info -o json -t titanium', function (error, stdout, stderr) {
		var out,
			selectedSDK;
		if (error !== null) {
			return next('Failed to get SDK install dir: ' + error);
		}

		out = JSON.parse(stdout);
		selectedSDK = out.titaniumCLI.selectedSDK;

		next(null, out.titanium[selectedSDK].path);
	});
}

/**
 * Runs `titanium create` to generate a project for the specific platforms.
 * @param  {Array[String]}   platforms
 * @param  {Function} next      [description]
 */
function generateProject(platforms, next) {
	var prc;
	prc = spawn('node', [titanium, 'create', '--force',
		'--type', 'app',
		'--platforms', platforms.join(','),
		'--name', PROJECT_NAME,
		'--id', 'com.appcelerator.testApp.testing',
		'--url', 'http://www.appcelerator.com',
		'--workspace-dir', __dirname,
		'--no-prompt']);
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
			// FIXME Do we want app thinning?
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
			content.push('<module platform="android">ti.map</module>');
		}
		// Inject some properties used by tests!
		else if (line.indexOf('<property name="ti.ui.defaultunit"') >= 0) {
			content.push('<property name="presetBool" type="bool">true</property>');
			content.push('<property name="presetDouble" type="double">1.23456</property>');
			content.push('<property name="presetInt" type="int">1337</property>');
			content.push('<property name="presetString" type="string">Hello!</property>');
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
	if (fs.existsSync(src)) {
		wrench.copyDirSyncRecursive(src, dest, {
			forceDelete: true
		});
	}
	next();
}

function runBuild(platform, next) {
	var prc = spawn('node', [titanium, 'build',
		'--project-dir', PROJECT_DIR,
		'--platform', platform,
		'--target', (platform === 'android') ? 'emulator' : 'simulator',
		'--log-level', 'info',
		'--no-prompt', '--no-colors']);
	handleBuild(prc, next);
}

/**
 * Once a build has been spawned off this handles grabbing the test results from the output.
 * @param  {[type]}   prc  Handle of the running process from spawn
 * @param  {Function} next [description]
 */
function handleBuild(prc, next) {
	var results = [],
		output = '',
		stderr = '',
		splitter = prc.stdout.pipe(StreamSplitter('\n'));

	// Set encoding on the splitter Stream, so tokens come back as a String.
	splitter.encoding = 'utf8';

	splitter.on('token', function(token) {
		console.log(token);

		var str = token,
			index = -1,
			result;

		if ((index = str.indexOf('!TEST_START: ')) != -1) {
			// grab out the JSON and add to our result set
			str = str.slice(index + 13).trim();
			output = '';
			stderr = '';
		} else if ((index = str.indexOf('!TEST_END: ')) != -1) {
			str = str.slice(index + 11).trim();
			//  grab out the JSON and add to our result set
			result = JSON.parse(massageJSONString(str));
			result.stdout = output; // record what we saw in output during the test
			result.stderr = stderr; // record what we saw in output during the test
			results.push(result);
			output = ''; // reset output
			stderr = ''; // reset stderr
			result = null; // reset test result object
		} else if ((index = str.indexOf('!TEST_RESULTS_STOP!')) != -1) {
			prc.kill();
			return next(null, {date: (new Date).toISOString(), results: results});
		// Handle when app crashes and we haven't finished tests yet!
		} else if ((index = str.indexOf('-- End application log ----')) != -1) {
			prc.kill(); // quit this build...
			return next('failed to get test results before log ended!'); // failed too many times
		} else {
			// append output
			output += str + '\n';
		}
	});
	splitter.on('error', function(err) {
		// Any errors that occur on a source stream will be emitted on the
		// splitter Stream, if the source stream is piped into the splitter
		// Stream, and if the source stream doesn't have any other error
		// handlers registered.
		next(err);
	});
	prc.stderr.on('data', function (data) {
		console.log(data.toString().trim());
		stderr += data.toString().trim() + '\n';
	});
}

function massageJSONString(testResults) {
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
	return testResults.replace(/[\u0000-\u0019]+/g,'');
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
	var r = ejs.render('' + fs.readFileSync(JUNIT_TEMPLATE),  { 'suites': values, 'prefix': prefix });

	// Write the JUnit XML to a file
	fs.writeFileSync(path.join(__dirname, 'junit.' + prefix + '.xml'), r);
	next();
}

/**
 * Remove all CI SDKs installed. Skip GA releases, and skip the passed in SDK path we just installed.
 * @param  {String} sdkPath The SDK we just installed for testing. Keep this one in case next run can use it.
 * @param {Function} next
 */
function cleanNonGaSDKs(sdkPath, next) {
	var prc = exec('node "' + titanium + '" sdk list -o json', function (error, stdout, stderr) {
		var out,
			installedSDKs;
		if (error !== null) {
			return next('Failed to get list of SDKs: ' + error);
		}

		out = JSON.parse(stdout);
		installedSDKs = out.installed;
		// Loop over the SDKs and remove any where the key doesn't end in GA, or the value isn't sdkPath
		async.each(Object.keys(installedSDKs), function (item, callback) {
			var thisSDKPath = installedSDKs[item];
			if (item.slice(-2) === 'GA') { // skip GA releases
				return callback(null);
			}
			if (thisSDKPath === sdkPath) { // skip SDK we just installed
				return callback(null);
			}
			wrench.rmdirRecursive(thisSDKPath, callback);
		}, function(err) {
			next(err);
		});
	});
}

/**
 * Installs a Titanium SDK to test against, generates a test app, then runs the
 * app for each platform with our mocha test suite. Outputs the results in a JUnit
 * test report, and holds onto the results in memory as a JSON object.
 *
 * @param  {String}   branch    [description]
 * @param  {Array[String]}   platforms [description]
 * @param  {Function} callback  [description]
 */
function test(branch, platforms, callback) {
	var sdkPath,
		tasks = [],
		results = {};

	tasks.push(function (next) {
		// install new SDK and delete old test app in parallel
		async.parallel([
			function (cb) {
				console.log('Installing SDK');
				installSDK(branch, cb);
			},
			clearPreviousApp
		], next);
	});
	// Record the SDK we just installed so we retain it when we clean up at end
	tasks.push(function (next) {
		getSDKInstallDir(function (err, installPath) {
			if (err) {
				return next(err);
			}
			sdkPath = installPath;
			next();
		});
	});

	tasks.push(function (next) {
		console.log('Generating project');
		generateProject(platforms, next);
	});

	tasks.push(addTiAppProperties);
	tasks.push(copyMochaAssets);

	// run build for each platform, and spit out JUnit report
	platforms.forEach(function (platform) {
		tasks.push(function (next) {
			runBuild(platform, function (err, result) {
				if (err) {
					return next(err);
				}
				results[platform] = result;
				outputJUnitXML(result, platform, next);
			});
		});
	});

	async.series(tasks, function (err) {
		cleanNonGaSDKs(sdkPath, function (cleanupErr) {
			callback(err || cleanupErr, results);
		});
	});
}

// public API
exports.test = test;

// When run as single script.
if (module.id === '.') {
	(function () {
		var program = require('commander'),
			packageJson = require('./package');

		program
			.version(packageJson.version)
			// TODO Allow chooisng a URL or zipfile as SDK to install!
			.option('-b, --branch [branchName]', 'Install a specific branch of the SDK to test with', /^(12\.0|14\.0)$/, 'master')
			.option('-p, --platforms [platform1,platform2]', 'Run unit tests on the given platforms', /^(android(,ios)?)|(ios(,android)?)$/, 'android,ios')
			.parse(process.argv);

		test(program.branch, program.platforms.split(','), function(err, results) {
			if (err) {
				console.error(err.toString());
				process.exit(1);
			} else {
				// TODO Do something with the results! Maybe we can use some mocha reporter here to spit out results to CLI?
				process.exit(0);
			}
		});
	})();
}
