'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	buses = require('../../app/controllers/buses.server.controller');

module.exports = function(app) {
	// Bus Routes
	app.route('/buses')
		.get(buses.list) // all users can view
		.post(buses.create); // only admin can create
	
	app.route('/buses/:busId')
		.get(buses.read) // all users can view a candidate 
		.put(buses.update) // only admin can modify
		.delete(buses.delete); // only admin can delete

	// Finish by binding the bus middleware
	app.param('busId', buses.busByID);
};
