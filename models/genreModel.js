const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		//enum: ['Action','Adventure','Animation','Comedy','Documentary','Drama','Horror','Romance','Thriller'],
		required: true
	}
});

const Genre = mongoose.model('Genre', genreSchema);

//probably not needed once set to enum
function validateGenre(genre) {
	const schema = {
		name: Joi.string().required()
	};
	return Joi.valid(genre, genreSchema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validateGenre = validateGenre;
