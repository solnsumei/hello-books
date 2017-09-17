import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
/* eslint-disable */
import '../scss/materialize.min.scss';
import '../scss/style.scss';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import './js/site.js';
/* eslint-enable */
import App from './components/App';

const history = createBrowserHistory();

render(<Router history={history}><App /></Router>, window.document.getElementById('app'));
