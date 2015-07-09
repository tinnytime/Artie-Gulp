//  ========================================================================
//
//    Artie front-end framework
//    https://github.com/indrekpaas/Artie
//    MIT licensed
//
//  ========================================================================

;(function(module, $, undefined) {
    'use strict';

    var helloWorld = require('./modules/hello-world');

    helloWorld('World');

})(window.app = window.app || {}, jQuery);
