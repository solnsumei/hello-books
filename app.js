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
import failedRoutes from './server/middlewares/failedRoutes';

// Set up the express app
const app = express();

dotenv.config();

const compiler = webpack(webpackConfig);

const env = process.env.NODE_ENV || 'development';

const publicPath = path.join(__dirname, './client/dist/');
const indexPath = path.resolve(__dirname, publicPath, 'index.html');

// Log requests to the console
app.use(logger('dev'));

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

// app.use(webpackHotMiddleware(compiler));
app.use('/', express.static(publicPath));

app.get('/api/*', failedRoutes);
app.post('/api/*', failedRoutes);

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.use(failedRoutes);

export default app;
