'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Student = mongoose.model('Student'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('RIDER BEING CREATED');
	var student = new Student(req.body);

	student.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(student);
		}
	});
};

/**
 * List of students
 */
exports.list = function(req, res) {
	Student.find().sort('-created').exec(function(err, students) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(students);
		}
	});
};

/**
 * Show the current student
 */
exports.read = function(req, res) {
	res.json(req.student);
};

/**
 * Update a student
 */
exports.update = function(req, res) {
	var student = req.student;

	student = _.extend(student, req.body);

	student.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(student);
		}
	});
};

/**
 * Delete a student
 */
exports.delete = function(req, res) {
	var student = req.student;

	student.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(student);
		}
	});
};

/**
 * Student middleware
 */
exports.studentByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Student is invalid'
		});
	}

	Student.findById(id).exec(function(err, student) {
		if (err) return next(err);
		if (!student) {
			return res.status(404).send({
  				message: 'Student not found'
  			});
		}
		req.student = student;
		next();
	});
};
