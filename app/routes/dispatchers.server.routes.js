'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	dispatchers = require('../../app/controllers/dispatchers.server.controller');

module.exports = function(app) {
	// Rider Routes
	app.route('/dispatchers')
		.get(dispatchers.list) // all users can view
		.post(dispatchers.create); // only admin can create
};
