const { User } = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const router = express.Router();

//start using await async, code becomes much simpler
router.post('/', (req, res) => {
	//Step 1: validae the user input for authentication
	const { error } = validateUser(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	User.findOne({ email: req.body.email }) //this is thenable but does not return a promise, but use exec() to get proper promise
		.exec()
		.then((user) => {
			if (!user) {
				//step 2: check if user doesnt exisrts
				console.log('User doesnt exist');
				return res.status(400).send('No such User in DB ');
			} else {
				//Step3:else decrypt password
				return bcrypt.compare(req.body.password, user.password);
			}
		})
		.then((validPassword) => {
			//Step 4:check if the password returned is not valid
			if (!validPassword) {
				return res.status(400).send('Incorrect password');
			}
			//If password is valid get user again, diasdvatage of promise, use async await
			return User.findOne({ email: req.body.email }).exec();
		})
		.then((user) => {
			console.log(user._id);
			//Step 5:create a JSON Web Token (JWT) for user,
			//first arg = payload and the 2nd argument is the private key(a string that should be stored as an environment variable)
			const token = jwt.sign({ _id: user._id }, 'JWTPrivateKey'); //dont do this, store key in env var instead and then use that here
			//const decoded = jwt.verify(token, 'JWTPrivateKey'); //This works, gets correct id
			//console.log('VerifiedID::', decoded._id);
			return res.send(token); //should return JSON Web token
		})
		.catch((error) => {
			console.log('ERRORERROR::', error.name, error.message);
		});
});

function validateUser(user) {
	const validationSchema = {
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

	return Joi.validate(user, validationSchema);
}

module.exports = router;
