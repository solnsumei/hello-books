import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm';
import Register from './Register';
import Catalog from './Catalog';

const Container = () => (
  <section id="content">
    <br/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={LoginForm}/>
      <Route path='/register' component={Register}/>
      <Route path='/catalog' component={Catalog}/>
    </Switch>
  </section>
);

export default Container;
