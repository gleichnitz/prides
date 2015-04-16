'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	queues = require('../../app/controllers/queues.server.controller');

module.exports = function(app) {
	// Bus Routes
	app.route('/queues')
		.get(queues.list) // all users can view
		.post(queues.create); // only admin can create
	
	app.route('/queues/:queueId')
		.get(queues.read) // all users can view a candidate 
		.put(queues.update) // only admin can modify
		.delete(queues.delete); // only admin can delete

	// Finish by binding the queues middleware
	// app.param('queueId', queues.queueByID);
};
