exports.isIOS = function() {
	return (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad');
};

exports.isAndroid = function() {
	return ('android' === Ti.Platform.osname);
};

exports.isWindowsPhone() = function() {
	return Ti.Platform.osname === 'windowsphone';
};

exports.isWindowsDesktop() = function() {
	return Ti.Platform.osname === 'windowsstore';
};

exports.isWindows() = function() {
	return isWindowsPhone() || isWindowsDesktop();
};

exports.isWindows10() = function() {
	return isWindows() && Ti.Platform.version.indexOf('10.0' == 0);
};

exports.isWindows8_1() = function() {
	return isWindows() && Ti.Platform.version.indexOf('6.3.9600') == 0;
};
