import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * PreventAuthenticated user component
 * redirects authenticated users
 * to the profile page
 * @param {Object} Page
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
export default (Page, props) => (
  !props.user || !props.user.id ? (
    <Page {...props} />
  ) : (
    <Redirect to="/profile" />
  ));
