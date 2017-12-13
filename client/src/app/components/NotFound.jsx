import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="row">
    <div className="col s12">
      <h1 className="center-align white-text">404</h1>
      <h3 className=" center-align white-text">Resource your are looking for is not available</h3>

      <h3 className="center-align">
        <Link to='/' className="btn primary">Click to go back</Link>
      </h3>
    </div>
  </div>
);

export default NotFound;
