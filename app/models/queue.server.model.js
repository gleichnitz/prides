'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Queue Schema
 */
var QueueSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	riders: [{
		type: Schema.ObjectId,
		ref: 'Rider'
	}],
	numRiders: {
		type: Number,
		default: '0',
	}
});

mongoose.model('Queue', QueueSchema);