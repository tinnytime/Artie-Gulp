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

    hello('World');

})(window.app = window.app || {}, jQuery);
