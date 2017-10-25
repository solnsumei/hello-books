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

  let sideNavClass = 'side-nav';
  if (user.firstName) {
    sideNavClass = `${sideNavClass} fixed show-on-large`;
  } else {
    sideNavClass = `${sideNavClass} hide-on-large-only`;
  }

  return (
    <header className={user.username && 'header'}>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            <i className="material-icons prefix">local_library</i> Hello Books
          </Link>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            { user.firstName ?
              <li>
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </li>
              :
              <li>{linkToShow}</li> }
          </ul>
          <ul className={sideNavClass} id="slide-out">
            {user.username &&
              <li>
                <div className="user-view">
                  <div className="background">
                    <img src="images/office.jpg" />
                  </div>
                  <a href="#!user">
                    <img className="circle" src="images/yuna.jpg"/>
                  </a>
                  <Link to="/profile">
                    <span className="white-text name">
                      {`${user.firstName} ${user.surname}`}
                    </span>
                  </Link>
                  <Link to="/profile">
                    <span className="white-text email">
                      {user.email}
                    </span>
                  </Link>
                </div>
              </li>
            }
            { user.username ?
              <div>
                <li>
                  <NavLink to="/books" activeClassName="active-nav">
                    Catalog
                  </NavLink>
                </li>
                <AuthLinks isAdmin={user.admin} />
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