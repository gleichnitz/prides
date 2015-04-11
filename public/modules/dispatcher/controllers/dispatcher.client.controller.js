'use strict';

angular.module('dispatcher').controller('DispatcherController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		$scope.bus = {number:'1', location: {latitude: 40.3492, longitude: -74.6493}, full: 'false'};
		$scope.bus2 = {number:'1', location: {latitude: 40.3592, longitude: -74.6513}, full: 'false'};

		$scope.system = {paused:'false'};

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.riders = 
			[{order: 1, netid: 'gtl', time: 5, start: {latitude: 40.342329, longitude: -74.657848}, stop: {latitude: 40.348012, longitude: -74.652913}}, 
			{order: 2, netid: 'jaevans', time: 10, start: {latitude: 40.347329, longitude: -74.657248}, stop: {latitude: 40.345329, longitude: -74.657848}}, 
			{order: 3, netid: 'charlie', time:9, start: {latitude: 40.342267, longitude: -74.662503}, stop: {latitude: 40.347267, longitude: -74.661603}}
		];

		$scope.myMap = { center: {latitude: 40.3468, longitude: -74.6554}, zoom: 15 };

		$scope.init = function() {
			console.log('init');
		};

		$scope.$on('mapInitialized', function(event, map) {
	  //   	console.log('mapInitialized');
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

		$scope.$watch('$viewContentLoaded', function(){
		    console.log('content loaded');
		    
		 });

		$scope.busFull = function() {
			console.log('bus is full');
			$scope.bus.full = 'true';
			$scope.system.paused = 'true';
			// send message to all riders
			// freeze time
		};

		$scope.busNotFull = function() {
			console.log('bus no longer full');
			$scope.bus.full = 'false';
			$scope.system.paused = 'false';
			// send message to all riders
			// update times??
		};

		$scope.pause = function() {
			$scope.system.paused = 'true';
			// freeze time
		};

		$scope.unpause = function() {
			$scope.system.paused = 'false';
			// unfreeze time
		};

		$scope.addTime = function(addition) {
			angular.forEach($scope.riders, function(rider, riderNum) {
				console.log(rider);
				rider.time += addition;
				console.log(rider.time);
			});
		};


	}
]);