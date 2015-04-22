'use strict';

angular.module('rider').controller('RiderController', ['$scope', '$interval', '$filter', '$http', '$location', 'Authentication', 'RiderFactory', 'BusFactory', 'uiGmapIsReady', 
	function($scope, $interval, $filter, $http, $location, Authentication, RiderFactory, BusFactory, MapIsReady) {

		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// variables to be populated from database
		$scope.myMap = null;
		$scope.bus = null;
		$scope.riders = [];
		$scope.user1 = null;
		$scope.user = { id:'gtl', loc: {latitude: 40.3468, longitude: -74.6553}};
		$scope.updatePromise = null;

		// Constants
		$scope.map = { 
			center: {
				latitude: 40.3468, 
				longitude: -74.6553
			}, 
			zoom: 16 
		};
		$scope.currentMarker = '/modules/rider/img/current.png';
		$scope.busMarker = '/modules/rider/img/bus.png';

		// Start and End Marker positions
		$scope.startMarker = {
			options: {
				draggable: true
			}, coords: {
				latitude: null,
				longitude: null
			},
			events: {
				dragend: function (marker, eventName, args) {
					$scope.user1.startCoords.latitude = marker.getPosition().lat();
					$scope.user1.startCoords.longitude = marker.getPosition().lng();
					$scope.updateRider($scope.user1);
				}
			},
			icon: '/modules/rider/img/start.png'
		};
		$scope.endMarker = {
			options: {
				draggable: true
			},
			events: {
				dragend: function (marker, eventName, args) {
					$scope.user1.endCoords.latitude = marker.getPosition().lat();
					$scope.user1.endCoords.longitude = marker.getPosition().lng();
					$scope.updateRider($scope.user1);
				}
			},
			icon: '/modules/rider/img/end.png'
		};

		$scope.updateRider = function(user) {
			user.$update(function(response) {
				console.log('user updated ');
			}, function(errorResponse) {
				$scope.updateError = errorResponse.data.message;
				console.log('user not updated');
			});
		};

		// Calls when map is loaded
	    MapIsReady.promise().then(function (maps) {
	        $scope.myMap = maps[0].map;
	        $scope.init();
	    });

		$scope.init = function() {
			console.log('init');

			$scope.updateFromDatabase();

			$scope.user1 = new RiderFactory({
				netid: 'gtl',
				inQueue: false
			});
			$scope.user1.$save(function(response) {
				console.log('new user created ');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('user not created');
			});
			console.log($scope.user1.startCoords);

			// $scope.user1.then(function() {
			// 	$scope.user1.startCoords.latitude = $scope.user.loc.latitude + 0.0001;
			// 	$scope.user1.startCoords.longitude = $scope.user.loc.longitude + 0.0001;
			// 	$scope.user1.endCoords.latitude = $scope.user.loc.latitude - 0.0005;
			// 	$scope.user1.endCoords.longitude = $scope.user.loc.longitude + 0.0003;
			// });
			
			$scope.updatePromise = $interval(function() { $scope.updateFromDatabase(); }, 10000);
		};

		$scope.updateFromDatabase = function() {
			var newRiders = [];
			var riders = RiderFactory.query();

			console.log('updated from database');

			if ($scope.user1 !== null) {
				$scope.user1 = RiderFactory.get({
					riderID: $scope.user1._id
				});
			}
			console.log($scope.user1);
			
			
			riders.$promise.then(function(riders) {
				var ridersInQueue = [];
				var riderIDs = [];

				angular.forEach(riders, function(rider) {
					if (rider.inQueue === true)  {
						ridersInQueue.push(rider);
						riderIDs.push(rider._id);
					}
				});

				angular.forEach($scope.riders, function(oldRider) {
					var index = riderIDs.indexOf(oldRider._id);
					if (index === -1) {
						$scope.riders.splice($scope.riders.indexOf(oldRider), 1);
					} else {
						riderIDs.splice(index, 1);
						ridersInQueue.splice(index, 1);
					}
				});

				angular.forEach(ridersInQueue, function(rider) {
					$scope.riders.push(rider);
				});	
			});	

			var buses = BusFactory.query();
			buses.$promise.then(function(riders) {
				$scope.bus = buses[0];
			});
		};

		$scope.addRiders = function() {
			var riders = RiderFactory.query();
			
			riders.$promise.then(function(riders) {
				angular.forEach(riders, function(rider) {
					if ($scope.riders.indexOf(rider) === -1) { 
						if (rider.inQueue === true) {
							$scope.riders.push(rider);
						}
					}
				});
				if (riders.length > 0) {
					$scope.user1.startCoords.latitude = $scope.user1.startCoords.latitude + 0.0001;
					$scope.user1.startCoords.longitude = $scope.user1.startCoords.longitude + 0.0001;
					$scope.user1.endCoords.latitude = $scope.riders[0].endCoords.latitude;
					$scope.user1.endCoords.longitude = $scope.riders[0].endCoords.longitude;
				}
			});
		};

		$scope.addBus = function() {
			var buses = BusFactory.query();

			buses.$promise.then(function(buses) {
				$scope.bus = buses[0];
				console.log($scope.bus.coords);
			});
		};

		$scope.getImage = function(index) {
			var path = '/modules/rider/img/' + index + '.png';
			return path;
		};
		$scope.getImageEnd = function(index) {
			var path = '/modules/rider/img/' + index + '_end.png';
			return path;
		};

		$scope.request = function() {
			$scope.user1.inQueue = true;
			$scope.user1.time = $scope.riders[$scope.riders.length - 1].time + 5;

			$scope.user1.$update(function(response) {
				console.log('added to queue ');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				$scope.user1.inQueue = false;
				console.log('rider not added');
			});

			$scope.endMarker.options.draggable = false;
			$scope.startMarker.options.draggable = false;
		};

		$scope.cancel = function() {
			var oldQueue = $scope.user1.inQueue;
			$scope.user1.inQueue = false;
			$scope.user1.cancelled = true;

			$scope.user1.$update(function(response) {
				console.log('removed from queue ');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				$scope.user1.inQueue = oldQueue;
				$scope.user1.cancelled = false;
				console.log('rider not removed');
			});

			$scope.endMarker.options.draggable = true;
			$scope.startMarker.options.draggable = true;
		};

	}
]);