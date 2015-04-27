'use strict';

angular.module('dispatcher').controller('DispatcherController', ['$scope', 'ngDialog', '$filter', '$interval', '$http', '$location', 'Authentication', 'RiderFactory', 'BusFactory', 'uiGmapIsReady',
	function($scope, ngDialog, $filter, $interval, $http, $location, Authentication, RiderFactory, BusFactory, MapIsReady) {
		$scope.authentication = Authentication;
		
		// variables to be pulled from database
		$scope.riders = [];
		$scope.timePromise = null;
		$scope.updatePromise = null;
		$scope.bus = null;

		$scope.defaultStart = {
			latitude: 40.3467,
			longitude: -74.6551
		};

		$scope.defaultEnd = {
			latitude: 40.3469,
			longitude: -74.6552
		};

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// constants
		$scope.map = { center: {latitude: 40.3468, longitude: -74.6554}, zoom: 15 };
		$scope.busMarker = '/modules/rider/img/bus.png';

		$scope.marker = {
			options: {
				draggable: true
			}, 
			startCoords: {
				latitude: $scope.defaultStart.latitude,
				longitude: $scope.defaultStart.longitude
			},
			endCoords: {
				latitude: $scope.defaultEnd.latitude,
				longitude: $scope.defaultEnd.longitude
			},
			startIcon: '/modules/rider/img/start.png',
			endIcon: '/modules/rider/img/end.png',
			startEvents: {
				dragend: function (marker, eventName, args) {
					$scope.marker.startCoords.latitude = marker.getPosition().lat();
					$scope.marker.startCoords.longitude = marker.getPosition().lng();
				}
			},
			endEvents: {
				dragend: function (marker, eventName, args) {
					$scope.marker.endCoords.latitude = marker.getPosition().lat();
					$scope.marker.endCoords.longitude = marker.getPosition().lng();
				}
			}
		};

		MapIsReady.promise().then(function (maps) {
	        $scope.myMap = maps[0].map;
	        $scope.init();
	    });

		$scope.init = function() {
			console.log('init');
			
			$scope.setMarkerToDefault();
			$scope.updateFromDatabase();

			$scope.updatePromise = $interval(function() { $scope.updateFromDatabase(); }, 10000);
			// $scope.start();
		};

		$scope.setMarkerToDefault = function() {
			$scope.marker.startCoords = {
				latitude: $scope.defaultStart.latitude,
				longitude: $scope.defaultStart.longitude
			};
			$scope.marker.endCoords = {
				latitude: $scope.defaultEnd.latitude,
				longitude: $scope.defaultEnd.longitude
			};
		}

		$scope.updateFromDatabase = function() {
			var newRiders = [];
			var riders = RiderFactory.query();

			console.log('updated from database');

			/* actual route id = 4000442 */
			/* last used: 4005134 */
			/* current; 4005798 */
			/* tiger line express: 4005794 7 am - 7 pm*/
			/* tiger line: 4005790 */
			var req = {
			 method: 'GET',
			 url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=84&callback=call&routes=4005794',
			 headers: {
			   'X-Mashape-Key': 'G7nWYXfIrGmshUUVS8ffX1olPpwsp15SygGjsnkckkdghFexdm'
			 }
			};

			$http(req).
			  success(function(data, status, headers, config) {
			  	if (data['data']['84'] !== undefined) {
					var location = data['data']['84'][0]['location'];
					$scope.bus.coords = {
						latitude: location['lat'] - 0.0001,
						longitude: location['lng'] - 0.0001
					};
					console.log($scope.bus.coords);
					$scope.updateBus($scope.bus);
			  	} else {
			  		console.log('couldnt get bus coordinates');
			  		$scope.bus.coords = {
			  			latitude: 0,
			  			longitude: 0
			  		};
			  		$scope.updateBus($scope.bus);
			  	}
			  	
 			  }).
			  error(function(data, status, headers, config) {
			    console.log('error getting bus location');
			  });
			
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

		$scope.saveRider = function(rider) {
			rider.$update( function(response) {
				console.log('rider updated');
			}, function (errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not updated');
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

		// Functions to handle changing time for riders (stopwatch and manual)

		$scope.start = function() {
			console.log('time starting to run');
			$scope.stop();
			
			$scope.timePromise = $interval(function() {$scope.addTime(-1);}, 6000);
			$scope.bus.paused = false;
			$scope.updateBus($scope.bus);
		};

		$scope.stop = function() {
			$interval.cancel($scope.timePromise);
			$scope.bus.paused = true;
			$scope.updateBus($scope.bus);
		};

		$scope.$on('$destroy', function() {
      		$scope.stop();
    	});

		// Functions to handle new rider popup

    	$scope.openRider = function () {
			ngDialog.open({
				template: 'newRiderForm',
				className: 'ngdialog-theme-default',
				scope:$scope
			});
		};	

		$scope.closeAll = function() {
			ngDialog.close();
		};

		$scope.dequeueRider = function(rider) {
			rider.inQueue = false;
			var index = $scope.riders.indexOf(rider);

			rider.$update( function(response) {
				$scope.riders.splice(index, 1);
				console.log('rider dequeued');
			}, function (errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not dequeued');
			});
		};

		$scope.deleteRider = function(rider) {
			// remove is wrong!
			rider.$remove( function(response) {
				console.log('rider deleted');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not deleted');
			});
		};

		$scope.updateBus = function(bus) {
			bus.$update(function(response) {
				console.log('bus updated');
			}, function(errorResponse) {
				console.log('failed to close round');
			}); 
		};

		$scope.$watch('$viewContentLoaded', function(){
		    console.log('content loaded');
		    
		 });

		$scope.busFull = function() {
			$scope.stop();
			console.log('bus is full');
			$scope.bus.full = true;
			$scope.bus.paused = true;
			$scope.updateBus($scope.bus);
		};

		$scope.busNotFull = function() {
			$scope.start();
			console.log('bus no longer full');
			$scope.bus.full = false;
			$scope.bus.paused = false;
			$scope.updateBus($scope.bus);
		};

		$scope.pause = function() {
			$scope.stop();
			$scope.bus.paused = true;
			$scope.updateBus($scope.bus);
		};

		$scope.unpause = function() {
			$scope.start();
			$scope.bus.paused = false;
			$scope.updateBus($scope.bus);
		};

		$scope.addTime = function(addition) {
			angular.forEach($scope.riders, function(rider, riderNum) {
				rider.time += addition;
				if (rider.time < 0) 
					rider.time = 0;
				if (rider.time - addition)
				rider.$update(function(response) {
					console.log('rider updated');
				}, function (errorResponse) {
					console.log('failed to close round');
				});
				console.log(rider.time);
			});
		};

		// Create new bus and rider

		$scope.createBus = function(lat, lng) {
			var bus = new BusFactory({
				coords: {
					latitude: lat,
					longitude: lng
				}
			});
			console.log(bus);
			bus.$save(function(response) {
				console.log('bus created');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('bus not created');
			});
		};

		$scope.createNewRider = function(rider) {
			console.log(rider);
			var newRider = new RiderFactory({
				netid: rider.netid,
				time: rider.time,
				startCoords: $scope.marker.startCoords, 
				endCoords: $scope.marker.endCoords,
			});
			newRider.$save(function(response) {
				$scope.riders.push(newRider);
				console.log('rider created');
				$scope.setMarkerToDefault();
				ngDialog.close();
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not created');
			});
		};
	}
]);