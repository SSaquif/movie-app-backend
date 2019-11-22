const express = require('express');
const Joi = require('joi');
//can use joi-password-complexity as well
const router = express.Router();

const genres = [
	{ id: 1, name: 'Action' },
	{ id: 2, name: 'Comedy' },
	{ id: 3, name: 'Horror' }
];

function validateGenre(genre) {
	//use Joi to make sure genre has name of type string
	const schema = {
		name: Joi.string().required()
	};
	return Joi.validate(genre, schema); //Joi returns validated value, error and warnings
}

router.get('/', (req, res) => {
	console.log(req.body);
	return res.send(genres);
});

router.get('/:id', (req, res) => {
	const genreID = parseInt(req.params.id); //convert id to int since everything in body is string or do JSON.parse
	const genre = genres.find((element) => {
		console.log(element.id === genreID); //Note this returns tur
		return element.id === genreID; //However the find method returns the elment and not boolean vbalue true
	});
	console.log(genre);

	if (!genre) {
		return res.status(400).send('The genre with given ID was not found'); //send error if id dont exist
	}
	return res.send(genre); //otherwise send genre
});

router.post('/', (req, res) => {
	//validate via Joi and check for errors
	//console.log(JSON.stringify(req.body));
	const validationResult = validateGenre(req.body);
	if (validationResult.error) {
		res.status(400).send(validationResult.error.message); //send error and the msg from joi
	}

	//Object deconstruction way
	// const { error } = validateGenre(req.body);
	// if (error){
	//     res.status(400); //send error
	// }

	//Add entry and send it back to user
	const genre = {
		id: genres.length + 1, //this can cause duplicates after deletion as id not !== array index
		name: req.body.name
	};
	genres.push(genre);
	return res.send(genre);
});

router.put('/:id', (req, res) => {
	//check if the id exist
	const genreID = parseInt(req.params.id); //convert id to int since everything in param is string
	let genre = genres.find((element) => {
		console.log('genreID: ' + genreID);
		console.log('element: ' + element.id);
		return element.id === genreID;
	});

	if (!genre) {
		return res.status(400).send('The genre with given ID was not found'); //send error if id dont exist
	}

	//validate new entry
	const validationResult = validateGenre(req.body);
	if (validationResult.error) {
		return res.status(400).send(validationResult.error.message); //send error and the msg from joi;
	}
	//add entry and send to user
	genre.name = req.body.name;
	return res.send(genre);
});

router.delete('/:id', (req, res) => {
	//check if the id exist
	const genreID = parseInt(req.params.id); //convert id to int since everything in body is string or do JSON.parse
	console.log('genreID: ' + genreID);
	const genre = genres.find((element) => {
		return element.id === genreID;
	});

	if (!genre) {
		return res.status(400).send('The genre with given ID was not found'); //send error if id dont exist
	}

	//if genre exits, get the id and delete
	const indexToDelete = genres.indexOf(genre); //get the index
	console.log(indexToDelete);
	genres.splice(indexToDelete, 1);
	res.send(genre);
});

//very impoertant
module.exports = router;
