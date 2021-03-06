
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rider Schema
 */
var RiderSchema = new Schema({
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
	startCoords: {
		latitude: {
			type: Number,
			default: 40.3467
		}, 
		longitude: {
			type: Number,
			default: -74.6551
		}	
	},
	endCoords: {
		latitude: {
			type: Number,
			default: 40.3469
		}, 
		longitude: {
			type: Number,
			default: -74.6552
		}	
	},
	time: {
		type: Number,
		default: '30',
		trim: true
	},
	inQueue: {
		type: Boolean,
		default: true
	},
	cancelled: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Rider', RiderSchema);