'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('dispatcher');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('rider');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config Dispatcher menus
// angular.module('dispatcher').config(['Menus',
// 	function(Menus) {
// 		// Set top bar menu items
// 		Menus.addMenuItem('topbar', 'Positions', 'positions', 'item', '/positions', null, null, 1);
// 	}
// ]);
'use strict';

// Setting up route
angular.module('dispatcher').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('dispatcher', {
			url: '/dispatcher',
			templateUrl: 'modules/dispatcher/views/dispatcher.client.view.html'
		});	
	}
]);
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
		};

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
			 url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=84&callback=call&routes=4005790',
			 headers: {
			   'X-Mashape-Key': 'G7nWYXfIrGmshUUVS8ffX1olPpwsp15SygGjsnkckkdghFexdm'
			 }
			};

			$http(req).
			  success(function(data, status, headers, config) {
			  	if (data['data']['84'] !== undefined) {
					var location = data.['data'].['84'][0]['location'];
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
'use strict';
'use strict';

// Setting up route
angular.module('rider').config(
	function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	}
).config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);
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

angular.module('rider').factory('StudentFactory', ['$resource',
	function($resource) {
		return $resource('/students/:studentID', {
			studentID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		/*
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});*/
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('dispatcher');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('rider');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config Dispatcher menus
// angular.module('dispatcher').config(['Menus',
// 	function(Menus) {
// 		// Set top bar menu items
// 		Menus.addMenuItem('topbar', 'Positions', 'positions', 'item', '/positions', null, null, 1);
// 	}
// ]);
'use strict';

// Setting up route
angular.module('dispatcher').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('dispatcher', {
			url: '/dispatcher',
			templateUrl: 'modules/dispatcher/views/dispatcher.client.view.html'
		});	
	}
]);
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
		};

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
			 url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=84&callback=call&routes=4005790',
			 headers: {
			   'X-Mashape-Key': 'G7nWYXfIrGmshUUVS8ffX1olPpwsp15SygGjsnkckkdghFexdm'
			 }
			};

			$http(req).
			  success(function(data, status, headers, config) {
			  	if (data['data']['84'] !== undefined) {
					var location = data.data.84.0.location;
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
'use strict';
'use strict';

// Setting up route
angular.module('rider').config(
	function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	}
).config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);
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

angular.module('rider').factory('StudentFactory', ['$resource',
	function($resource) {
		return $resource('/students/:studentID', {
			studentID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		/*
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});*/
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('dispatcher');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('rider');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config Dispatcher menus
// angular.module('dispatcher').config(['Menus',
// 	function(Menus) {
// 		// Set top bar menu items
// 		Menus.addMenuItem('topbar', 'Positions', 'positions', 'item', '/positions', null, null, 1);
// 	}
// ]);
'use strict';

// Setting up route
angular.module('dispatcher').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('dispatcher', {
			url: '/dispatcher',
			templateUrl: 'modules/dispatcher/views/dispatcher.client.view.html'
		});	
	}
]);
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
		};

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
			 url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=84&callback=call&routes=4005790',
			 headers: {
			   'X-Mashape-Key': 'G7nWYXfIrGmshUUVS8ffX1olPpwsp15SygGjsnkckkdghFexdm'
			 }
			};

			$http(req).
			  success(function(data, status, headers, config) {
			  	if (data['data']['84'] !== undefined) {
					var location = data['data']['84'][0]['location'];
					$scope.bus.coords = {
						latitude: location.lat - 0.0001,
						longitude: location.lng - 0.0001
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
'use strict';
'use strict';

// Setting up route
angular.module('rider').config(
	function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	}
).config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);
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

angular.module('rider').factory('StudentFactory', ['$resource',
	function($resource) {
		return $resource('/students/:studentID', {
			studentID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		/*
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});*/
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('dispatcher');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('rider');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config Dispatcher menus
// angular.module('dispatcher').config(['Menus',
// 	function(Menus) {
// 		// Set top bar menu items
// 		Menus.addMenuItem('topbar', 'Positions', 'positions', 'item', '/positions', null, null, 1);
// 	}
// ]);
'use strict';

// Setting up route
angular.module('dispatcher').config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('dispatcher', {
			url: '/dispatcher',
			templateUrl: 'modules/dispatcher/views/dispatcher.client.view.html'
		});	
	}
]);
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
		};

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
			 url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=84&callback=call&routes=4005790',
			 headers: {
			   'X-Mashape-Key': 'G7nWYXfIrGmshUUVS8ffX1olPpwsp15SygGjsnkckkdghFexdm'
			 }
			};

			$http(req).
			  success(function(data, status, headers, config) {
			  	if (data['data']['84'] !== undefined) {
					var location = data['data']['84'][0]['location'];
					$scope.bus.coords = {
						latitude: location.lat - 0.0001,
						longitude: location.lng - 0.0001
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
'use strict';
'use strict';

// Setting up route
angular.module('rider').config(
	function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	}
).config(['$stateProvider',
	function($stateProvider) {
		// Upcoming state routing
		$stateProvider.
		state('rider', {
			url: '/rider',
			templateUrl: 'modules/rider/views/rider.client.view.html'
		});	
	}
]);
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

angular.module('rider').factory('StudentFactory', ['$resource',
	function($resource) {
		return $resource('/students/:studentID', {
			studentID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		/*
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});*/
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);