import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

const AuthLinks = ({ isAdmin }) => (
  <div>
    { !isAdmin ?
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
      </div> :
      <div>
        <li>
          <Link to="/admin">
            Dashboard
          </Link>
        </li>
        <li>
          <NavLink to="/admin/categories" activeClassName="active-nav">
            Manage Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/books" activeClassName="active-nav">
            Manage Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/membership-types" activeClassName="active-nav">
            Membership Types
          </NavLink>
        </li>
      </div>
    }
  </div>
);

export default AuthLinks;
