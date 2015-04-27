
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rider Schema
 */
var StudentSchema = new Schema({
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
			default: '40.3467'
		}, 
		longitude: {
			type: Number,
			default: '-74.6551'
		}	
	},
	endCoords: {
		latitude: {
			type: Number,
			default: '40.3469'
		}, 
		longitude: {
			type: Number,
			default: '-74.6552'
		}	
	},
	currentLoc: {
		latitude: {
			type: Number,
			default: '40.3469'
		}, 
		longitude: {
			type: Number,
			default: '-74.6552'
		}	
	},
	requests:  {
		type: [Schema.ObjectId],
		ref: 'Rider'
	}
});

mongoose.model('Student', StudentSchema);