import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = rest;
  return (
    <Route {...rest} render={props => (
      user.id ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
  );
};

export default AuthRoute;
