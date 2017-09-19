// import required files
import express from 'express';
import logger from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './server/routes';

// Set up the express app
const app = express();

dotenv.config();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api Routes
app.use('/api/v1', router);

// Default catch all route to test on Heroku if app is working
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-Books'
}));

export default app;
