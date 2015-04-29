'use strict';

angular.module('rider').controller('RiderController', ['$scope', 'ngDialog', '$interval', '$filter', '$http', '$location', 'Authentication', 'RiderFactory', 'StudentFactory', 'BusFactory', 'uiGmapIsReady', 
	function($scope, ngDialog, $interval, $filter, $http, $location, Authentication, RiderFactory, StudentFactory, BusFactory, MapIsReady) {

		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// variables to be populated from database
		$scope.myMap = null;
		$scope.bus = null;
		$scope.riders = [];
		$scope.user = null;
		$scope.request= null;
		$scope.updatePromise = null;

		$scope.longestTime = 0;

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
					$scope.user.startCoords.latitude = marker.getPosition().lat();
					$scope.user.startCoords.longitude = marker.getPosition().lng();
					$scope.updateRider($scope.user);
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
					$scope.user.endCoords.latitude = marker.getPosition().lat();
					$scope.user.endCoords.longitude = marker.getPosition().lng();
					$scope.updateRider($scope.user);
				}
			},
			icon: '/modules/rider/img/end.png'
		};

		// Calls when map is loaded
	    MapIsReady.promise().then(function (maps) {
	        $scope.myMap = maps[0].map;
	        $scope.init();
	    });

		$scope.init = function() {
			console.log('init');

			ngDialog.open({
				template: 'newStudentForm',
				className: 'ngdialog-theme-default',
				scope:$scope,
				showClose: false,
				closeByDocument: false
			});

			$scope.updateFromDatabase();
			
			$scope.updatePromise = $interval(function() { $scope.updateFromDatabase(); }, 10000);
		};

		$scope.createNewStudent = function(student) {
			/* ensure the form is filled out */
			if (student === undefined || student.netid === undefined || student.phoneNumber === undefined) {
				return;
			}

			var newStudent = new StudentFactory({
				netid: student.netid,
				phoneNumber: student.phoneNumber
			});

			newStudent.$save(function(response) {
				console.log('new student created ');
				$scope.user = newStudent;
				ngDialog.close();
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('student not created');
				console.log(newStudent);
			});

			console.log($scope.user);
		};

		$scope.updateFromDatabase = function() {
			var newRiders = [];
			var riders = RiderFactory.query();

			console.log('updated from database');			
			
			riders.$promise.then(function(riders) {
				var ridersInQueue = [];
				var riderIDs = [];

				var longestTime = 0;

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
						if (oldRider.time > longestTime)
							longestTime = oldRider.time;
					}
				});

				angular.forEach(ridersInQueue, function(rider) {
					$scope.riders.push(rider);
					if (rider.time > longestTime) 
						longestTime = rider.time;
				});	

				$scope.longestTime = longestTime;
			});	

			var buses = BusFactory.query();
			buses.$promise.then(function(riders) {
				$scope.bus = buses[0];
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
			var rider = new RiderFactory({
				inQueue: true,
				time: $scope.longestTime + 5,
				netid: $scope.user.netid,
				startCoords: $scope.user.startCoords,
				endCoords: $scope.user.endCoords,
				user: $scope.user._id
			});

			rider.$save(function(response) {
				console.log('added to queue ');
				$scope.request = rider;
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not added');
			});
			console.log('out of save function');
			$scope.endMarker.options.draggable = false;
			$scope.startMarker.options.draggable = false;
		};

		$scope.cancel = function() {
			var oldQueue = $scope.request.inQueue;
			$scope.request.inQueue = false;
			$scope.request.cancelled = true;

			$scope.request.$update(function(response) {
				console.log('removed from queue ');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				$scope.request.inQueue = oldQueue;
				$scope.request.cancelled = false;
				console.log('rider not removed');
			});

			$scope.endMarker.options.draggable = true;
			$scope.startMarker.options.draggable = true;
		};

		$scope.updateRider = function(user) {
			user.$update(function(response) {
				console.log('user updated ');
			}, function(errorResponse) {
				$scope.updateError = errorResponse.data.message;
				console.log('user not updated');
			});
		};

	}
]);