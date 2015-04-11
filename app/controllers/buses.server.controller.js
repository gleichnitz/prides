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