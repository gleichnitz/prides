'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	riders = require('../../app/controllers/riders.server.controller');

module.exports = function(app) {
	// Rider Routes
	app.route('/riders')
		.get(riders.list) // all users can view
		.post(riders.create); // only admin can create

	app.route('/riders/:riderId')
		.get(riders.read) // all users can view a candidate 
		.put(riders.update) // only admin can modify
		.delete(riders.delete); // only admin can delete

	// Finish by binding the rider middleware
	app.param('riderId', riders.riderByID);
};
