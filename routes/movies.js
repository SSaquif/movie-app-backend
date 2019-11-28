const { Movie } = require('../models/movieModel');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

//get movie based on genre

//This three should be in the admin route
//add a movie
//delete a movie
//update a movie

//get movies from database
router.get('/', (req, res) => {
	Movie.find({})
		.sort({ title: 1 })
		.exec()
		.then((result) => {
			console.log(result);
			return res.send(result).status(200);
		});
});

//This doesnt work, see stackoverflow solution, its beacuse how u imported the data
//https://stackoverflow.com/questions/47827392/mongoose-findbyid-returns-null-even-with-valid-id
router.get('/:id', (req, res) => {
	console.log('Param', typeof req.params.id);
	Movie.findById(req.params.id)
		.exec()
		.then((result) => {
			if (!result) {
				return res.send('Movie not found').status(404);
			}
			console.log('Result', result);
			return res.send(result).status(200);
		})
		.catch((err) => {
			console.log(err);
		});
});

//Conflicting route with above, will mostl likely get from body
// router.get('/:title', (req, res) => {
// 	Movie.findOne({ title: req.params.title })
// 		.exec()
// 		.then((result) => {
// 			console.log(result);
// 			if (!result) {
// 				return res.send('Movie not found').status(200);
// 			}
// 			return res.send(result).status(200);
// 		});
// });

module.exports = router;
