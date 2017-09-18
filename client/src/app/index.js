import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
/* eslint-disable */
import '../scss/materialize.min.scss';
import '../scss/style.scss';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import './js/site.js';
/* eslint-enable */
import App from './components/App';
import configureStore from './store/configureStore';

const history = createBrowserHistory();

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history}><App /></Router>
  </Provider>, window.document.getElementById('app'));
