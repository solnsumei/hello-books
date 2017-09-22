import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderNavigation from './HeaderNavigation';

const Header = ({ user }) => (
  <header>
    <nav className="teal">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          <i className="material-icons prefix">local_library</i> Hello Books
        </Link>
        <a href="#" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <HeaderNavigation user={user} className="right hide-on-med-and-down" />
        <HeaderNavigation user={user} className="side-nav" id="mobile-demo" />
      </div>
    </nav>
  </header>
);


export default Header;
