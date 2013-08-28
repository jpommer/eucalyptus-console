// Filename: router.js
/**
 * Big Fun Print - (c)2012 Brainfood, Inc.
 */
define([
  'jQueryTransit',
  'underscore',
  'Backbone',
  'auth',
  ], function($, _, Backbone, auth) {
	var openRoutes = ['login', 'register', 'about', 'error', 'qr'];
	var screenStack = [];
	var AppRouter = Backbone.Router.extend({
		currentPage: null,
		routes: {
			// Define some URL routes
			'': 'showHome',
	   		'back': 'back',

			// Default cover-all route for plain views
			':route' : 'changePage',
			':route/:config' : 'changePage',
			// Default
			'*actions': 'defaultAction'
		},

		showHome: function(route) {
			screenStack.length = 0;
			this.changePage('home', {});
		},

		back: function(route) {
			this.showHome();
		},

		defaultAction: function(actions){
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		},
		changePage: function(route, config) {
			console.log("ROUTER: change to '" + route + "'");
			var routeArgs = {route: route, config: config};

			var _this = this;
			// If there is no authToken and this page is not open then we need to kick you to login
			if (_.contains(openRoutes, route)) {
				console.log("ROUTER: Open route");
				_this.loadPage(routeArgs);
			} else {
				if (auth.loggedIn()) {
					_this.loadPage(routeArgs);
				} else {
					window.location = '#login';
				}
			}
		},
		loadPage: function(routeArgs) {
			var finalRoute = 'views/' + routeArgs.route + '/index';
			require([finalRoute], function(pageClass) {
				console.log("ROUTER: created", finalRoute, pageClass, routeArgs);

				var self = this;
				var screenWidth = $(window).width();
				var screenHeight = $(window).height();

				var newpage = $('<div class="newpage"><div class="overthrow"></div></div>');

				$(newpage).css({
					"background-color": "transparent",
					"z-index": "-1",
					x: screenWidth,
					y: 0,
					position: "absolute",
					height:'100%',
					width:'100%'});

				$(newpage).find('.scrollable').css({width:'100%'});

				var oldpage = $('.oldpage');

				routeArgs.el = $(newpage).find('.overthrow');
				$('body').append(newpage);

				console.log('page class', pageClass);
				var page = new pageClass(routeArgs);

				console.log('current page', this.currentPage?this.currentPage.footer:'nope', page.footer);

				$(newpage).show();
				$(newpage).transition({x: "0px"}, function() {
					$(newpage).removeClass('newpage');
					$(newpage).addClass('oldpage');
                    page.trigger('arrived');
				});

				$(oldpage).transition({x: -screenWidth}, function() {
                    if (self.currentPage != undefined) {
                        self.currentPage.trigger('departed');
    					self.currentPage = page;
                    }
					$(oldpage).remove();
				});
			});
		}
	});

	return AppRouter;
});
