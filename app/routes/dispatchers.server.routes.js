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

	app.route('/dispatchers/:dispatcherId')
		.get(dispatchers.read) // all users can view a candidate 
		.put(dispatchers.update) // only admin can modify
		.delete(dispatchers.delete); // only admin can delete

	// Finish by binding the dispatcher middleware
	// app.param('dispatcherId', dispatchers.dispatcherId);
};
