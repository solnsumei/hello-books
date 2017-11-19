import React from 'react';
import { Link } from 'react-router-dom';
/**
 *
 */
export default class HomePage extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div className="container">
        <div className="row valign-wrapper height600">
          <div className="col s12">
            <h4 className="center-align">Welcome to Hello Books Library</h4>
            <p className="center-align">
              <Link to='/login' className="btn">Login</Link>
              &nbsp;
              <Link to='/register' className="btn">Register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
