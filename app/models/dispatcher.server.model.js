'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dispatcher Schema
 */
var DispatcherSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	netid: {
		type: String,
		default: '',
		trim: true,
		required: 'netid cannot be blank'
	},
	password: {
		type: String,
		default: '',
		trim: true,
		required: 'password cannot be blank'
	},
	current: {
		type: Boolean,
		default: 'false',
	}
});

mongoose.model('Dispatcher', DispatcherSchema);