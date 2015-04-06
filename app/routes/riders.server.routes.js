'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	riders = require('../../app/controllers/riders.server.controller');

module.exports = function(app) {
	// Rider Routes
	app.route('/riders')
		.get(users.requiresLogin) // all users can view
		.post(riders.create); // only admin can create
};
