import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ user }) => (
  <div className="col s12 m4">
    <div className="card">
      <div className="card-content profile">
        <h3 className="card-title teal-text"><strong>Profile</strong></h3>

        <div className="divider"></div>
        <br />

        <p><strong><i className="material-icons">person</i> Name:</strong></p>
        <h4>{`${user.firstName} ${user.surname}`}</h4>
        <div className="divider"></div>

        <p><strong><i className="material-icons">email</i> Email:</strong></p>
        <h4>{user.email}</h4>
        <div className="divider"></div>

        <p><strong><i className="material-icons">person</i> Username:</strong></p>
        <h4>{user.username}</h4>
        <div className="divider"></div>

        <p><strong><i className="material-icons">wc</i> Membership Type:</strong></p>
        <h4>{user.membershipType}</h4>

      </div>
      <div className="card-action">
        <button className="btn waves-effect waves-light teal" name="action">
          <i className="material-icons">edit</i> Edit Profile
        </button>
      </div>
    </div>
  </div>
);

export default UserDetail;
