'use strict';

// Setting up route
angular.module('rider').config(
	function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	}
).config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);