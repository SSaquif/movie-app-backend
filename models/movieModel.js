const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 1,
		maxlength: 50,
		required: true,
		trim: true
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true
	},
	dailyRentalRate: {
		type: Number,
		required: true
	},
	publishDate: {
		type: Date
	}
});
