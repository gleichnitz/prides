'use strict';

angular.module('dispatcher').controller('DispatcherController', ['$scope', 'ngDialog', '$filter', '$interval', '$http', '$location', 'Authentication', 'RiderFactory', 'BusFactory',
	function($scope, ngDialog, $filter, $interval, $http, $location, Authentication, RiderFactory, BusFactory) {
		$scope.authentication = Authentication;
		$scope.riders = [];
		$scope.buses = [];
		// $scope.bus = null;

		$scope.timePromise;

		$scope.bus = {number:'1', location: {latitude: 40.3492, longitude: -74.6493}, full: 'false', paused: false};

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.myMap = { center: {latitude: 40.3468, longitude: -74.6554}, zoom: 15 };

		$scope.init = function() {
			console.log('init');
			var riders = RiderFactory.query();
			console.log(riders);
			
			riders.$promise.then(function(riders) {
				angular.forEach(riders, function(rider) {
					if (rider.inQueue === true) {
						$scope.riders.push(rider);
					}
				});
			});

			var buses = BusFactory.query();

			// $scope.start();

			// $scope.bus = buses[0];
			// console.log($scope.bus);
			// $scope.createBus(40.3492, -74.6513);
			// $scope.createRider('kendra', 9, 40.342267, -74.662503, 40.347267, -74.661603, '6503217788');
			// $scope.createRider('gtl', 14, 40.342329, -74.657848, 40.348012, -74.652913, '9495545306');
			// $scope.createRider('jaevans', 19, 40.347329, -74.657248, 40.345329, -74.657848, '6503217788');
			// $scope.createRider('charlie', 15, 40.342267, -74.662503, 40.347267, -74.661603, '6503217788');
		
		};

		$scope.start = function() {
			console.log('in scope.start');
			$scope.stop();
			
			$scope.timePromise = $interval(function() {$scope.addTime(-1);}, 6000);
		};

		$scope.stop = function() {
			$interval.cancel($scope.timePromise);
		};

		$scope.$on('$destroy', function() {
      		$scope.stop();
    	});

    	$scope.openRider = function () {
			ngDialog.open({
				template: 'newRiderForm',
				className: 'ngdialog-theme-default',
				scope:$scope
			});
		};	

		$scope.createBus = function(longitude, latitude) {
			var bus = new BusFactory({
				longitude: longitude,
				latitude: latitude,
			});
			bus.$save(function(response) {
				$scope.buses.push(bus);
				console.log('bus created');
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('bus not created');
			});
		};

		$scope.update = function() {
			console.log('update');
		};

		$scope.closeAll = function() {
			ngDialog.close();
		};

		$scope.createNewRider = function(rider) {
			console.log(rider);
			var newRider = new RiderFactory({
				netid: rider.netid,
				time: rider.time,
				startLatitude: rider.startLatitude,
				startLongitude: rider.startLongitude,
				endLatitude: rider.endLatitude, 
				endLongitude: rider.endLongitude,
				phoneNumber: rider.phoneNumber
			});
			newRider.$save(function(response) {
				$scope.riders.push(newRider);
				console.log('rider created');
				ngDialog.close();
			}, function(errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not created');
			});
		};

		$scope.dequeueRider = function(rider) {
			rider.inQueue = false;
			var index = $scope.riders.indexOf(rider);
			console.log(index);
			console.log('rider to dequeue: ' + rider);

			rider.$update( function(response) {
				$scope.riders.splice(index, 1);
				console.log('rider dequeued');
			}, function (errorResponse) {
				$scope.saveError = errorResponse.data.message;
				console.log('rider not dequeued');
			});
		};

		$scope.deleteRider = function(riderId) {
			console.log(riderId);
			var rider = RiderFactory.get({
				riderID: riderId
			});
			var index = $scope.riders.indexOf(rider);
			console.log(index);
			console.log(rider);
			rider.$remove( function(response) {
				$scope.riders.splice(index, 1);
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
			$scope.bus.full = 'true';
			$scope.bus.paused = 'true';
			$scope.updateBus($scope.bus);
			// send message to all riders
			// freeze time
		};

		$scope.busNotFull = function() {
			$scope.start();
			console.log('bus no longer full');
			$scope.bus.full = 'false';
			$scope.bus.paused = 'false';
			// $scope.updateBus($scope.bus);
			// send message to all riders
		};

		$scope.pause = function() {
			$scope.stop();

			$scope.bus.paused = 'true';
			// $scope.updateBus($scope.bus);
		};

		$scope.unpause = function() {
			$scope.start();

			$scope.bus.paused = 'false';
			// $scope.updateBus($scope.bus);
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

		$scope.$on('mapInitialized', function(event, map) {
		     console.log('mapInitialized');
		  //   	var latLng = new google.maps.LatLng($scope.riders.rider1.start.latitude, $scope.riders.rider1.start.longitude);
			// var marker = new google.maps.Marker({
			//     position: latLng,
			//     title:"Hello World!",
			//     icon: "/modules/rider/img/current.png"
			// });

			// var busMarker = new google.maps.Marker({
			//       position: new google.maps.LatLng($scope.bus.location.latitude, $scope.bus.location.longitude),
			//       title: 'Tester',
			//       animation: 'Animation.BOUNCE',
			//       icon: '/modules/rider/img/bus.png'
			// });
			// busMarker.setMap(map);
			// console.log(marker);
			// var latLng = new google.maps.LatLng(0,0);
			// map.setCenter(latLng);
	    });
	}
]);