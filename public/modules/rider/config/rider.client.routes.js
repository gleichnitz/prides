'use strict';

// Setting up route
angular.module('rider').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);