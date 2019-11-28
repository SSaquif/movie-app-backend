const { User, validateUser } = require('../models/userModel');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const router = express.Router();

//TO CREATE A NEW USER//

//start using await async, code becomes much simpler
router.post('/', (req, res) => {
	//Step 1: validae the user input and if there is an error, send 400 res and error message
	const { error } = validateUser(req.body); //this is using Joi.validate() which has a error property if errors are found
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	User.findOne({ email: req.body.email }) //this is thenable, but use exec() to get proper promise
		.exec()
		.then((result) => {
			if (result) {
				//step 2: check if user already exists, if yes send res 400
				console.log('User exists');
				return res.status(400).send('User already exists');
			} else {
				//Step3:generate salt for password, if new user needs to be created
				return bcrypt.genSalt(10);
			}
		})
		.then((salt) => {
			//Step4:generate hash for password
			return bcrypt.hash(req.body.password, salt); //hash and add salt to password
		})
		.then((hashedPassword) => {
			//Step 5: otherwise enter new user into the database //can use lodash here as well
			let user = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword
			});
			return user.save(); //this returns a promise
		})
		.then((user) => {
			//console.log('save result::', JSON.stringify(user));
			user = lodash.pick(user, ['_id', 'name', 'email']); //just piock certain properties
			return res.status(200).send(user);
		})
		.catch((error) => {
			console.log('ERRORERROR::', error.name, error.message);
		});
});

module.exports = router;
