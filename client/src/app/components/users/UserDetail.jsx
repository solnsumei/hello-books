import React from 'react';
import { Link } from 'react-router-dom';

/**
 * User detail component
 * renders the user details on the profile page
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const UserDetail = ({ user, borrowedCount,
  noOfBooksNotReturned, onClickEdit, onClickChangePassword }) => (
  <div>
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content profile">
          <p className="center-align">
            <i className="material-icons medium primary-color">assignment_ind</i>
          </p>
          <h3 className="card-title center-align user-details">
            <strong>{`${user.firstName} ${user.surname}`}</strong>
          </h3>

          <div className="divider"></div>
          <br />

          <p><strong><i className="material-icons">email</i> Email:</strong></p>
          <h4>{user.email}</h4>
          <div className="divider"></div>

          <p><strong><i className="material-icons">person</i> Username:</strong></p>
          <h4>{user.username}</h4>
          <div className="divider"></div>

          {!user.admin &&
          <div>
            <p><strong><i className="material-icons">wc</i> Level:</strong></p>
            <h4>{user.level}</h4>
          </div>}

          <div className="card-action">
            <div className="row">
              <br />
              <button title="edit profile"
                className="btn waves-effect waves-light teal col s12 m4 add-margin-bottom"
                onClick={onClickEdit}>
                <i className="material-icons">edit</i> Edit
              </button>
              <div className="col m1"></div>
              {!user.googleUser &&
              <Link title="change password"
                className="btn waves-effect waves-light teal col s12 m7"
                to='/change-password'>
                <i className="material-icons">lock</i> Change Password
              </Link>
              }
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content profile">
          <h3 className="card-title center-align">
            <strong>Borrowed Books</strong>
          </h3>

          <div className="divider"></div>
          <br />
          <h4>
            <strong>
              <i className="material-icons">bookmark</i>
              Books Not Returned: {user.notReturned}
            </strong>
          </h4>
          <br/>
          <div className="divider"></div>
          <br/>
          <h4>
            <strong>
              <i className="material-icons">bookmark</i>
              Total Borrowed: {user.borrowedCount}
            </strong>
          </h4>
          <br/>
          <div className="card-action">
            <Link to="borrow-history" title="borrow history"
              className="btn waves-effect waves-light col s12 m8">
              <i className="material-icons">book</i> Borrow History
            </Link>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserDetail;
