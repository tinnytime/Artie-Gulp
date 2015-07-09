(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  ========================================================================
//
//    Artie front-end framework
//    https://github.com/indrekpaas/Artie
//    MIT licensed
//
//  ========================================================================

;(function(module, $, undefined) {
    'use strict';

    var hello = require('./modules/hello-world');
    var Person = require('./modules/person');

    hello('World');

    var human = new Person();
    
    human.setName('Joshua').setAge(25).setSex('Male');
    console.log(human);

})(window.app = window.app || {}, jQuery);
},{"./modules/hello-world":2,"./modules/person":3}],2:[function(require,module,exports){
'use strict';

module.exports = function(name) {
	console.log('Hello, ' + name);
};
},{}],3:[function(require,module,exports){
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
},{}]},{},[1])


//# sourceMappingURL=main.js.map