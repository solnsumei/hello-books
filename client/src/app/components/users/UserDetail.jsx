import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ user, borrowedCount,
  noOfBooksNotReturned, onClickEdit, onClickChangePassword }) => (
  <div>
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content profile">
          <p className="center-align">
            <i className="material-icons medium primary-color">assignment_ind</i>
          </p>
          <h3 className="card-title center-align">
            <strong>Profile</strong>
          </h3>

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

          {!user.admin &&
          <div>
            <p><strong><i className="material-icons">wc</i> Level:</strong></p>
            <h4>{user.level}</h4>
          </div>}

          <div className="card-action">
            <p>
              <button title="edit profile"
                className="btn waves-effect waves-light teal"
                onClick={onClickEdit}>
                <i className="material-icons">edit</i> Edit
              </button>
              &nbsp;
              <Link title="change password"
                className="btn waves-effect waves-light teal"
                to='/change-password'>
                <i className="material-icons">lock</i> Change Password
              </Link>
            </p>
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
              Books Not Returned: {noOfBooksNotReturned}
            </strong>
          </h4>
          <br/>
          <div className="divider"></div>
          <br/>
          <h4>
            <strong>
              <i className="material-icons">bookmark</i>
              Total Borrowed: {borrowedCount}
            </strong>
          </h4>
          <br/>
          <div className="card-action">
            <p>
              <Link to="borrow-history" title="borrow history"
                className="btn waves-effect waves-light">
                <i className="material-icons">book</i> Borrow History
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserDetail;
