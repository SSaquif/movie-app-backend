//SEEMS INDUSTRY STANDARD IS TO NAME THIS FILE index.js, m,aybe rename once it starts working
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres'); //ROUTING STEP 1: GET THE FILE
const users = require('./routes/users'); //ROUTING STEP 1: GET THE FILE
const movies = require('./routes/movies'); //ROUTING STEP 1: GET THE FILE
const auth = require('./routes/auth'); //ROUTING STEP 1: GET THE FILE
const mongoose = require('mongoose');
const config = require('config');

// console.log('Node_ENV::' + config.util.getEnv('Node_ENV'));
// console.log('jwtPrivatekey::' + config.util.getEnv('jwtPrivatekey'));
// console.log(
// 	'movieApp_jwtPrivatekey' + config.util.getEnv('movieApp_jwtPrivatekey')
// );
// if (!config.get('jwtPrivateKey')) {
// 	console.log('::FATAL ERROR:: JWT Private Key not found');
// 	process.exit(1); //1 indicates failure (0 is success)
// }

//seems i need to set this every time
console.log(process.env.movieApp_jwtPrivatekey); //this works, CONFIG MODULE DID NOT WORK

if (!process.env.movieApp_jwtPrivatekey) {
	console.log('::FATAL ERROR:: JWT Private Key not found');
	process.exit(1); //1 indicates failure (0 is success)
}

const app = express();

mongoose
	.connect('mongodb://localhost/movie-reviews-db')
	.then(() => console.log('Connected to Mongodb'))
	.catch((error) => console.log('Could not connect to DB::', error));

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres); //ROUTING STEP 2: route all paths in const genre(step 1) with prefix /api/genres
app.use('/api/users', users); //ROUTING STEP 2: route all paths in const genre(step 1) with prefix /api/genres
app.use('/api/movies', movies); //ROUTING STEP 2: route all paths in const genre(step 1) with prefix /api/genres
app.use('/api/auth', auth); //ROUTING STEP 2: route all paths in const genre(step 1) with prefix /api/genres

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening to port:${port}`);
});
