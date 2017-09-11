import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm';
import Register from './Register';

const Container = () => (
  <div className="container">
    <br/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={LoginForm}/>
      <Route path='/register' component={Register}/>
    </Switch>
  </div>
);

export default Container;
