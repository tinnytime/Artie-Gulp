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