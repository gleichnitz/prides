'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Article = mongoose.model('Rider'),
	_ = require('lodash');

exports.create = function(req, res) {
	console.log('HERE');
};
