var should = require('../should'),
	utilities = require('./utilities');

// Copied from newer should.js
should.Assertion.add('propertyWithDescriptor', function(name, desc) {
	this.params = {actual: this.obj, operator: 'to have own property with descriptor ' + JSON.stringify(desc)};
	var obj = this.obj;
	this.have.ownProperty(name);
	should(Object.getOwnPropertyDescriptor(Object(obj), name)).have.properties(desc);
}, false);

/**
 * Use this to test for read-only, non-configurable properties on an Object
 * @param {String} propName     Name of the property to test for.
 */
should.Assertion.add('readOnlyProperty', function (propName) {
	this.params = { operator: 'to have a read-only property with name: ' + propName };
	if (this.obj.apiName) {
		this.params.obj = this.obj.apiName;
	}
	var props = {writable: false};
	if (!utilities.isIOS()) { // FIXME read-only properties should also be non-configurable on iOS!
		props.configurable = false;
	}
	should(this.obj).have.propertyWithDescriptor(propName, props);
	this.obj = this.obj[propName];
}, false);

/**
 * Use this to test for read-only, non-configurable properties on the prototype of an Object
 * @param {String} propName     Name of the property to test for.
 */
should.Assertion.add('constant', function (propName) {
	var target = this.obj,
		props = {writable: false};
	this.params = { operator: 'to have a constant with name: ' + propName };
	if (!utilities.isIOS()) { // FIXME Should constants be moved to the prototype on iOS?
		target = Object.getPrototypeOf(this.obj); // on Android/Windows, constants live on prototype
		if (target) {
			this.params.obj = target;
		}
		props.configurable = false; // FIXME read-only properties should also be non-configurable on iOS!
	}
	should(target).have.propertyWithDescriptor(propName, props);
	this.obj = this.obj[propName];
}, false);

// TODO Add an assertion for "exclusive" group of constants: A set of constants whose values must be unique (basically an enum), i.e. Ti.UI.FILL vs SIZE vs UNKNOWN
module.exports = should;
