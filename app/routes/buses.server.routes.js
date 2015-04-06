'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	buses = require('../../app/controllers/buses.server.controller');

module.exports = function(app) {
	// Bus Routes
	app.route('/buses')
		.get(users.requiresLogin) // all users can view
		.post(users.requiresLogin, buses.create); // only admin can create
	
};
