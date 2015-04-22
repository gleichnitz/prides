
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
    phoneNumber: {
		type: Number,
		default: '9495545306',
		trim: true,
		required: 'phone number cannot be blank'
	},
	startCoords: {
		latitude: {
			type: Number,
			default: '40.3468'
		}, 
		longitude: {
			type: Number,
			default: '-74.6553'
		}	
	},
	endCoords: {
		latitude: {
			type: Number,
			default: '40.3468'
		}, 
		longitude: {
			type: Number,
			default: '-74.6553'
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
	}
});

mongoose.model('Rider', RiderSchema);