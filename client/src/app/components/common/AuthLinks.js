import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AuthLinks = () => (
  <div>
    <li>
      <NavLink to="/profile" activeClassName="active-nav">
        My Profile
      </NavLink>
    </li>
    <li>
      <NavLink to="/borrow-history" activeClassName="active-nav">
        Borrow History
      </NavLink>
    </li>
  </div>
);

export default AuthLinks;
