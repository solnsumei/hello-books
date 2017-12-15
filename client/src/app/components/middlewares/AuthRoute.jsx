import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Authenticated user component
 * redirects unauthorised users
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = rest;
  return (
    <Route {...rest} render={props => (
      user.id ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login'
        }} />
      )
    )} />
  );
};

export default AuthRoute;
