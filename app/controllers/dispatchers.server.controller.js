'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dispatcher = mongoose.model('Dispatcher'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('DISPATCHER BEING CREATED');
	var dispatcher = new Dispatcher(req.body);

	dispatcher.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dispatcher);
		}
	});
};

/**
 * List of Buses
 */
exports.list = function(req, res) {
	Dispatcher.find().sort('-created').exec(function(err, dispatchers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dispatchers);
		}
	});
};