const Joi = require('joi');
const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		minlength: 2,
// 		maxlength: 50,
// 		required: true
// 	},
// 	email: {
// 		type: String,
// 		//validate: /.*@.*/, //Doing this in Joi
// 		required: true,
// 		minlength: 5,
// 		maxlength: 255,
// 		unique: true
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 		minlength: 5,
// 		maxlength: 1024 //password in hash so longer than what we get
// 	}
// });

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 2,
			maxlength: 50,
			required: true
		},
		email: {
			type: String,
			//validate: /.*@.*/, //Doing this in Joi
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024 //password in hash so longer than what we get
		}
	})
);

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(2)
			.max(50)
			.required(),
		email: Joi.string()
			.min(5)
			.max(255)
			.email()
			.required(),
		password: Joi.string()
			.min(5)
			.max(255) //actual input length from user not the hash
			.required()
	};

	return Joi.validate(user, schema);
}

//exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
