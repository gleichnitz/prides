'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bus Schema
 */
var BusSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	running: {
		type: Boolean,
		default: false	
	},
	paused: {
		type: Boolean,
		default: false
	},
	number: {
		type: Number,
		default: '1',
	},
	coords: {
		latitude: {
			type: Number,
			default: ''
		}, 
		longitude: {
			type: Number,
			default: ''
		}	
	},
	numRiders: {
		type: Number,
		default: '0',
	},
	full: {
		type: Boolean,
		default: false
	}
	// queue: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Queue'
	// }
});

mongoose.model('Bus', BusSchema);