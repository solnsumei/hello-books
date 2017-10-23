// import required files
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import router from './server/routes';
import webpackConfig from './webpack.config';

// Set up the express app
const app = express();

const compiler = webpack(webpackConfig);

const env = process.env.NODE_ENV || 'development';

const publicPath = path.join(__dirname, './client/dist/');
const indexPath = path.resolve(__dirname, publicPath, 'index.html');

if (env !== 'production') {
  dotenv.config();
}

// Log requests to the console
if (env === 'development') {
  app.use(logger('dev'));
}


// Parse incoming requests data (https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api Routes
app.use('/api/v1', router);

if (env === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {
    // log: console.log
  }));
}

app.use(webpackHotMiddleware(compiler));

app.use('/', express.static(publicPath));

app.get('/api/*', (req, res) => res.status(404).send({
  error: 'Route not found',
}));

app.post('/api/*', (req, res) => res.status(404).send({
  error: 'Route does not exist',
}));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

export default app;
