'use strict';

angular.module('dispatcher').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

		$scope.request = function() {
			// $http.post('/dispatcher', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.request = response;

			// 	// And redirect to the index page
			// 	$location.path('/dispatcher');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};
	}
]);