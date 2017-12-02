import React from 'react';
import { Redirect } from 'react-router-dom';

export default (Page, props) => (
  !props.user || !props.user.id ? (
    <Page {...props} />
  ) : (
    < Redirect to="/profile" />
  ));
