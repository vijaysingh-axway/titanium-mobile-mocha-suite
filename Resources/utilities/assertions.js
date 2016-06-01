var should = require('../should');

should.Assertion.add('readOnly', function() {
	this.params = { operator: 'to be read-only' };

	var value = this.obj;
	should(this.obj).be.a.String;
	this.obj = 'try_to_overwrite_READONLY_value';
	should(this.obj).be.eql(value);
}, true);

should.Assertion.add('readOnlyNumber', function() {
	this.params = { operator: 'to be a read-only Number' };

	should(function () {
		should(this.obj).not.be.undefined;
		should(this.obj).be.a.Number;
		should(this.obj).be.readOnly;
	}).not.throw();
}, true);

should.Assertion.add('readOnlyString', function() {
	this.params = { operator: 'to be a read-only String' };

	should(function () {
		should(this.obj).not.be.undefined;
		should(this.obj).be.a.String;
		should(this.obj).be.readOnly;
	}).not.throw();
}, true);
