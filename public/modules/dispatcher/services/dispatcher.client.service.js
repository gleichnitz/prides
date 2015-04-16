'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('dispatcher').factory('BusFactory', ['$resource',
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

angular.module('dispatcher').factory('DispatcherFactory', ['$resource',
	function($resource) {
		return $resource('/dispatchers/:dispatcherID', {
			dispatcherID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('dispatcher').factory('RiderFactory', ['$resource',
	function($resource) {
		return $resource('/riders/:riderID', {
			riderID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);