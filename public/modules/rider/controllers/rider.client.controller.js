'use strict';

angular.module('rider').controller('RiderController', ['$scope', '$http', '$location', 'Authentication', 'RequestFactory', 'uiGmapGoogleMapApi', 
	function($scope, $http, $location, Authentication, RequestFactory, uiGmapGoogleMapApi) {

		$scope.authentication = Authentication;

		$scope.bus = {number:'1', location: {latitude: 40.3492, longitude: -74.6493}};
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.requested = 'false';

		var map;

		$scope.riders = 
			[{order: 1, netid: 'gtl', time: 5, start: {latitude: 40.342329, longitude: -74.657848}, stop: {latitude: 40.348012, longitude: -74.652913}}, 
			{order: 2, netid: 'jaevans', time: 10, start: {latitude: 40.347329, longitude: -74.657248}, stop: {latitude: 40.345329, longitude: -74.657848}}, 
			{order: 3, netid: 'charlie', time:9, start: {latitude: 40.342267, longitude: -74.662503}, stop: {latitude: 40.347267, longitude: -74.661603}}
		];

		$scope.map = { 
			center: {
				latitude: 40.3468, 
				longitude: -74.6553
			}, 
			zoom: 15 
		};

		$scope.user = { id:'gtl', location: {latitude: 40.3468, longitude: -74.6553}};

		$scope.startLatitude = {latitude: $scope.user.location.latitude, longitude: $scope.user.location.longitude};

		$scope.init = function() {
			console.log('init');
		    var myLatlng = new google.maps.LatLng(40.713956,-74.006653);

		    var myOptions = {
		    	zoom: 8,
		     	center: myLatlng,
		      	mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

		    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions); 
		     	var marker = new google.maps.Marker({
			  	draggable: true,
			  	position: myLatlng, 
			  	map: map,
			  	title: 'P-Rides Map'
			});
		};


		$scope.request = function() {
			console.log('requested');
			var request = new RequestFactory({
				'user': $scope.user.id
			});
			$scope.requested = 'true';
			// request.$save( function(response) {
			// 	$scope.requested = 'true';
			// }, function(errorResponse) {
			// 	$scope.requested = 'false';
			// });
			console.log($scope.requested);
		};

		$scope.cancel = function() {
			console.log('cancelled');
			$scope.requested = 'false';
		};

		$scope.handleDrop = function() {
			console.log('dropped');
		};

		uiGmapGoogleMapApi.then(function(maps) {
			// callback provides google map object
    	});
	}
]).directive('draggable', function() {
	return function(scope, element) {
		// this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    };
}).directive('droppable', function() {
	return {
        scope: {
        	drop: '&'
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];
            el.addEventListener(
			    'dragover',
			    function(e) {
			        e.dataTransfer.dropEffect = 'move';
			        // allows us to drop
			        if (e.preventDefault) e.preventDefault();
			        this.classList.add('over');
			        return false;
			    },
			    false
			);
			el.addEventListener(
			    'dragenter',
			    function(e) {
			        this.classList.add('over');
			        return false;
			    },
			    false
			);

			el.addEventListener(
			    'dragleave',
			    function(e) {
			        this.classList.remove('over');
			        return false;
			    },
			    false
			);
			el.addEventListener(
			    'drop',
			    function(e) {
			        // Stops some browsers from redirecting.
			        if (e.stopPropagation) e.stopPropagation();

			        this.classList.remove('over');

			        var binId = this.id;
			        var item = document.getElementById(e.dataTransfer.getData('Text'));
			        this.appendChild(item);

			        // call the drop passed drop function
                    scope.$apply(function(scope) {
					    var fn = scope.drop();
					    if ('undefined' !== typeof fn) {
					      fn(item.id, binId);
					  	}
				    });

			        return false;
			    },
			    false
			);
        }
    };
});