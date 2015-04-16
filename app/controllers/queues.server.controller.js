'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Queue = mongoose.model('Queue'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('QUEUE BEING CREATED');
	var queue = new Queue(req.body);

	queue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(queue);
		}
	});
};

/**
 * List of Queues
 */
exports.list = function(req, res) {
	Queue.find().sort('-created').exec(function(err, queues) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(queues);
		}
	});
};

/**
 * Show the current queue
 */
exports.read = function(req, res) {
	res.json(req.queue);
};

/**
 * Update a queue
 */
exports.update = function(req, res) {
	var queue = req.queue;

	queue = _.extend(queue, req.body);

	queue.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(queue);
		}
	});
};

/**
 * Delete a queue
 */
exports.delete = function(req, res) {
	var queue = req.queue;

	queue.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(queue);
		}
	});
};