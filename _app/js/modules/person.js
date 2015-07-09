'use strict';

var Person = function () {
	this.name = null;
	this.age = 0;
	this.sex = null;
};

Person.prototype.setName = function (name) {
	this.name = name;
	return this;
};

Person.prototype.setAge = function (age) {
	this.age = age;
	return this;
};

Person.prototype.setSex = function (sex) {
	this.sex = sex;
	return this;
};

module.exports = Person;