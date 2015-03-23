'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('dispatcher').factory('DispatcherFactory', ['$resource',
	function($resource) {
		return $resource('/api/v1/factory/:positionId', {
			positionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);