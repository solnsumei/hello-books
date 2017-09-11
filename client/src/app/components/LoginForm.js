import React from 'react';
import Input from './Input';
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
      <div className="row">
        <form className="col s12 m6 offset-m3">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Login</span>

              <div className="divider"></div>
              <br />

              <Input type="text" id="username" name="Username" className="validate" />

              <Input type="password" id="password" name="Password" className="validate" />
            </div>
            <div className="card-action">
              <div className="row valign-wrapper">
                <div className="col s5">
                  <button className="btn waves-effect waves-light" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                  </button>
                </div>
                <div className="col s7">
                  <a href="register.html">New? Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
