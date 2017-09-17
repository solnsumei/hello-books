import React from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
/**
 *
 */
export default class LoginForm extends React.Component {
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Login</span>

                <div className="divider"></div>
                <br />

                <TextInput type="text" name="username" label="Username"
                  errorMsg="This field is required" required="required" />

                <TextInput type="password" name="password" label="Surname"
                  errorMsg="This field is required" required="required" />
              </div>
              <div className="card-action">
                <div className="row valign-wrapper">
                  <div className="col s5">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                    Login <i className="material-icons right">send</i>
                    </button>
                  </div>
                  <div className="col s7">
                    <Link to="/register">New? Sign up</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
