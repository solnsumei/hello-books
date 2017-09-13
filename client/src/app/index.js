import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/* eslint-disable */
import '../scss/materialize.min.scss';
import '../scss/style.scss';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
/* eslint-enable */
import Header from './components/Header';
import Container from './components/Container';

const App = () => (
  <div>
    <Header />
    <Container />
  </div>
);

render(<BrowserRouter><App /></BrowserRouter>, window.document.getElementById('app'));
