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
	
};
