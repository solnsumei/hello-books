import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = ({ user, logout, title }) => {
  let linkToShow =
  <NavLink to="/" activeClassName="active-top">Login</NavLink>;

  if (title === 'Home' || title === 'Login') {
    linkToShow =
    <NavLink to="/register" activeClassName="active-top">Join</NavLink>;
  }

  return (
    <header>
      <nav className="teal">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            <i className="material-icons prefix">local_library</i> Hello Books
          </Link>
          <a href="#" data-activates="mobile-demo" className="button-collapse show-on-large-only">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to="/catalog" activeClassName="active-top">Catalog</NavLink></li>
            { user.firstName ?
              <li>
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </li>
              :
              <li>{linkToShow}</li> }
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><NavLink to="/catalog" activeClassName="active-nav">Catalog</NavLink></li>
            { user.firstName ?
              <div>
                <AuthLinks />
                <li>
                  <a href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </div>
              : <li>{linkToShow}</li> }
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default Header;
