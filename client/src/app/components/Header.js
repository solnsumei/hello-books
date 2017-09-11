import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="teal">
      <div className="nav-wrapper container">
        <a href="/" className="brand-logo">
          <i className="material-icons prefix">local_library</i> Hello Books
        </a>
        <a href="#" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to='/catalog'>Catalog</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to='/catalog'>Catalog</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
