'use strict';

// Setting up route
angular.module('dispatcher').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('dispatcher', {
			url: '/dispatcher',
			templateUrl: 'modules/dispatcher/views/dispatcher.client.view.html'
		});	
	}
]);