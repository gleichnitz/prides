'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bus = mongoose.model('Bus'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('BUS BEING CREATED');
	var bus = new Bus(req.body);

	bus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(bus);
		}
	});
};

/**
 * List of Buses
 */
exports.list = function(req, res) {
	Bus.find().sort('-created').exec(function(err, buses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(buses);
		}
	});
};

/**
 * Show the current bus
 */
exports.read = function(req, res) {
	res.json(req.bus);
};

/**
 * Update a bus
 */
exports.update = function(req, res) {
	var bus = req.bus;

	bus = _.extend(bus, req.body);

	bus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(bus);
		}
	});
};

/**
 * Delete a bus
 */
exports.delete = function(req, res) {
	var bus = req.bus;

	bus.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(bus);
		}
	});
};

/**
 * Bus middleware
 */
exports.busByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Bus is invalid'
		});
	}

	Bus.findById(id).exec(function(err, bus) {
		if (err) return next(err);
		if (!bus) {
			return res.status(404).send({
  				message: 'Bus not found'
  			});
		}
		req.bus = bus;
		next();
	});
};
