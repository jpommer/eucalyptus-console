/**
 * Big Fun Print - (c)2012 Brainfood, Inc.
 */

var isMobileWeb;

if (/^file.*/.test(document.URL)) {
    isMobileWeb = false;
} else {
    isMobileWeb = true;
}

define('mobileweb', isMobileWeb);

var paths = {
	jQuery: '../lib/jquery-1.8.2',
    jQueryTransit: '../lib/jquery.transit.min',
	underscore: '../lib/underscore-1.4.4',
    Backbone: '../lib/backbone-1.0',
	BackboneValidation: '../lib/backbone/backbone-validation',
	text: '../lib/text',
	domReady: '../lib/domReady',
    infinity: '../lib/infinity',
}

if (isMobileWeb) {
    paths['views/image/index'] = 'views/mobileimage/index';
}

require.config({
    timeout: 20,
	shim: {
		jQuery : {
			exports: '$',
		},
        jQueryTransit : {
            deps: ['jQuery'],
            exports: '$'
        },
		rivets : {
			deps: ['../lib/rivets', 'jQuery', 'Backbone'],
			exports: 'rivets'
		},
		underscore : {
			exports: '_'
		},
		Backbone : {
			deps: ['underscore'],
			exports: 'Backbone'
		},
		BackboneValidation : {
			deps: ['Backbone'],	
			exports: 'Backbone.Validation'
		},
        infinity : {
            deps: ['jQuery'],
            exports: 'infinity'
        },
    },
	paths: paths
});

require(['router'], function (Router) {
    var init = function () {
	    var router = new Router;
		Backbone.history.start();
	}

	if (isMobileWeb) {
		init();
	} else {
		document.addEventListener('deviceready', function(){
			init();
		}, false);
	}
});

