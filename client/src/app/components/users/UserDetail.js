import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ user, onClickEdit }) => (
  <div className="col s12 m4">
    <div className="card">
      <div className="card-content profile">
        <span className="card-title teal-text"><strong>Profile</strong></span>

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
        <h4>{user.membershipType}
          <a href="#" title="edit profile"
            className="right btn-floating waves-effect waves-light teal"
            onClick={onClickEdit}
            name="action">
            <i className="material-icons">edit</i>
          </a>
        </h4>
      </div>
    </div>
  </div>
);

export default UserDetail;
