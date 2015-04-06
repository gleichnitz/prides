'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('dispatcher').factory('DispatcherFactory', ['$resource',
	function($resource) {
		return $resource('/buses/:busID', {
			busID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);