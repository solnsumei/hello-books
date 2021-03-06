import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import 'jquery';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import '../css/toastr.css';
import '../scss/style.scss';
import './js/site';
import App from './components/App';
import configureStore from './store/configureStore';
import { checkAuthentication } from './actions/userActions';

axios.defaults.baseURL = '/api/v1';

const history = createBrowserHistory();

const store = configureStore();
store.dispatch(checkAuthentication());

render(
  <Provider store={store}>
    <Router history={history}><App { ...history }/></Router>
  </Provider>, window.document.getElementById('app'));
