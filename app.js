// import required files
import express from 'express';
import logger from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import router from './server/routes';

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter(param, msg, value) {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

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

app.use('/api', router);

// Default catch all route to test on Heroku if app is working
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-Books'
}));

export default app;
