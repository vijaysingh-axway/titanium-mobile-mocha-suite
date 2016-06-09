var should = require('../should');

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
	should(this.obj).have.propertyWithDescriptor(propName, {writable: false, configurable: false});
	this.obj = this.obj[propName];
}, false);

/**
 * Use this to test for read-only, non-configurable properties on the prototype of an Object
 * @param {String} propName     Name of the property to test for.
 */
should.Assertion.add('constant', function (propName) {
	this.params = { operator: 'to have a constant with name: ' + propName };
	var proto = Object.getPrototypeOf(this.obj);
	if (proto) {
		this.params.obj = proto;
	}
	should(proto).have.propertyWithDescriptor(propName, {writable: false, configurable: false});
	this.obj = this.obj[propName];
}, false);

// TODO Add an assertion for "exclusive" group of constants: A set of constants whose values must be unique (basically an enum), i.e. Ti.UI.FILL vs SIZE vs UNKNOWN
module.exports = should;
