import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Dashboard react component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const Dashboard = props => (
  <div className="top-padding">
    <div className="row">
      <div className="col s12">
        <h3 className="center-align">Admin Dashboard</h3>
      </div>
    </div>
    <div className="row">
      <div className="col s12 m4">
        <div className="card">
          <br />
          <Link to="/admin/membership-types">
            <div className="card-content center-align primary-color">
              <i className="large material-icons">collections</i>
              <br />
              <h4>Membership Types</h4>
            </div>
          </Link>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card">
          <br />
          <Link to="/admin/books">
            <div className="card-content center-align primary-color">
              <i className="large material-icons">book</i>
              <br />
              <h4>Books</h4>
            </div>
          </Link>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card">
          <br />
          <Link to="/admin/categories">
            <div className="card-content center-align primary-color">
              <i className="large material-icons">collections_bookmark</i>
              <br />
              <h4>Categories</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
