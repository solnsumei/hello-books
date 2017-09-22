import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import SignUpPage from './auth/SignUpPage';
import AuthRoutes from './AuthRoutes';

const Routes = props => (
  <section id="content">
    <br/>
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={SignUpPage} />
      <Route component={AuthRoutes} />
    </Switch>
  </section>
);

Routes.propTypes = {
  user: PropTypes.object
};

export default Routes;
