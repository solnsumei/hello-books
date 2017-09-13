import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <header>
    <nav className="teal">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          <i className="material-icons prefix">local_library</i> Hello Books
        </Link>
        <a href="#" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to='/catalog'>Catalog</Link></li>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/profile'>Solomon Nsumei</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to='/catalog'>Catalog</Link></li>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/profile'>Solomon Nsumei</Link></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
