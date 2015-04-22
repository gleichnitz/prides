'use strict';

angular.module('rider').factory('RiderFactory', ['$resource',
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

angular.module('rider').factory('BusFactory', ['$resource',
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