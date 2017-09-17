import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const HeaderNavigation = ({ user, className, id }) => (
  <ul className={className} id={id}>
    <li><NavLink to="/catalog" activeClassName="active">Catalog</NavLink></li>
    { user ?
      <li><NavLink to="/profile" activeClassName="active">{user.name}</NavLink></li> :
      <li><NavLink to="/" activeClassName="active">Login</NavLink></li> }
  </ul>
);

HeaderNavigation.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string.isRequired,
  id: PropTypes.string
};

export default HeaderNavigation;
