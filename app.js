// import required files
import express from 'express';
import logger from 'morgan';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { routes } from './server/routes';
import { secret } from "./config";

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('webSecret', secret);

// Express Validator Middleware
// Express Validator Middleware
app.use(expressValidator({
  errorFormatter(param, msg, value) {
    let namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg,
      value
    };
  }
}));

// Api Routes
routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-Books'
}));

export default app;
