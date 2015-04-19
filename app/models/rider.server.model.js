
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
		default: '',
		trim: true,
		required: 'phone number cannot be blank'
	},
	startLatitude: {
		type: Number,
		default: '',
		trim: true
	},
    startLongitude: {
		type: Number,
		default: '',
		trim: true
	},
	endLatitude: {
		type: Number,
		default: '',
		trim: true
	},
	endLongitude: {
		type: Number,
		default: '',
		trim: true
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