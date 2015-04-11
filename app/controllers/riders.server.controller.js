'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Rider = mongoose.model('Rider'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('RIDER BEING CREATED');
	var rider = new Rider(req.body);

	rider.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(rider);
		}
	});
};

/**
 * List of Buses
 */
exports.list = function(req, res) {
	Rider.find().sort('-created').exec(function(err, riders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(riders);
		}
	});
};