import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = (props) => {
  if (props.user && props.user.firstName) {
    props.user.name = `${props.user.firstName} ${props.user.surname}`;
  }

  return (
    <header>
      <nav className="teal">
        <div className="nav-wrapper">
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="side-nav fixed" id="mobile-demo">
            <li>
              <Link to="/" className="teal-text">
                <i className="material-icons prefix teal-text">local_library</i>
                  Hello Books
              </Link>
            </li>
            <li><NavLink to="/catalog" activeClassName="active-nav">Catalog</NavLink></li>
            { props.user.name ?
              <div>
                <AuthLinks />
                <li>
                  <a href="#" onClick={props.logout}>
                    Logout
                  </a>
                </li>
              </div>
              : <li><NavLink to="/" activeClassName="active-nav">Login</NavLink></li> }
          </ul>
        </div>
      </nav>
    </header>
  );
};


export default Header;
