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
 * List of Buses
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