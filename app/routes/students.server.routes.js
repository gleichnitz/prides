'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	students = require('../../app/controllers/students.server.controller');

module.exports = function(app) {
	// Rider Routes
	app.route('/students')
		.get(students.list) // all users can view
		.post(students.create); // only admin can create

	app.route('/students/:studentId')
		.get(students.read) // all users can view a candidate 
		.put(students.update) // only admin can modify
		.delete(students.delete); // only admin can delete

	// Finish by binding the rider middleware
	app.param('studentId', students.studentByID);
};
