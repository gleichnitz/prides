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
 * List of riders
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

/**
 * Show the current rider
 */
exports.read = function(req, res) {
	res.json(req.rider);
};

/**
 * Update a position
 */
exports.update = function(req, res) {
	var rider = req.rider;

	rider = _.extend(rider, req.body);

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
 * Delete a rider
 */
exports.delete = function(req, res) {
	var rider = req.rider;

	rider.remove(function(err) {
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
 * Rider middleware
 */
exports.riderByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Rider is invalid'
		});
	}

	Rider.findById(id).exec(function(err, rider) {
		if (err) return next(err);
		if (!rider) {
			return res.status(404).send({
  				message: 'Rider not found'
  			});
		}
		req.rider = rider;
		next();
	});
};
