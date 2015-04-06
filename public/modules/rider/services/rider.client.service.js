'use strict';

angular.module('rider').factory('RequestFactory', ['$resource',
	function($resource) {
		return $resource('/riders', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);