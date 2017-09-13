import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
/**
 *
 */
export default class UserDetail extends React.Component {
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content profile">
            <h3 className="card-title teal-text"><strong>Profile</strong></h3>

            <div className="divider"></div>
            <br />

            <p><strong><i className="material-icons">person</i> Name:</strong></p>
            <h4>{this.props.name}</h4>
            <div className="divider"></div>

            <p><strong><i className="material-icons">email</i> Email:</strong></p>
            <h4>{this.props.email}</h4>
            <div className="divider"></div>

            <p><strong><i className="material-icons">person</i> Username:</strong></p>
            <h4>{this.props.username}</h4>
            <div className="divider"></div>

            <p><strong><i className="material-icons">wc</i> Membership Type:</strong></p>
            <h4>{this.props.membershipType}</h4>

          </div>
          <div className="card-action">
            <button className="btn waves-effect waves-light blue" name="action">
              <i className="material-icons">edit</i> Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
}
