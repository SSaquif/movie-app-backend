const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genreModel');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 1,
		maxlength: 255,
		required: true,
		trim: true
	},
	//TODO::Change to an array of genres
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

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
	const schema = {
		title: Joi.string()
			.max(255)
			.required(),
		genre: Joi.string().required(),
		numberInStock: Joi.number(),
		dailyRentalRate: Joi.number(),
		publishDate: Joi.date()
	};

	return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
