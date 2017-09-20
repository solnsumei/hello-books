import React from 'react';
import 'jquery';
import dotenv from 'dotenv';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import 'materialize-css/dist/js/materialize';
import '../scss/materialize.min.scss';
import '../scss/style.scss';
import './js/site';

import App from './components/App';
import configureStore from './store/configureStore';

dotenv.config();

const history = createBrowserHistory();

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history}><App /></Router>
  </Provider>, window.document.getElementById('app'));
