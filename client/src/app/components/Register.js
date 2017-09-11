import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

/**
 *
 */
export default class Register extends React.Component {
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
                <span className="card-title">Create An Account</span>
                <p>Please fill out the form to register</p>
                <div className="divider"></div>
                <br />

                <Input type="text" id="firstName" name="First name" className="validate" />

                <Input type="text" id="surname" name="Surname" className="validate" />

                <Input type="email" id="email" name="Email" className="validate" />

                <Input type="text" id="username" name="Username" className="validate" />

                <Input type="password" id="password" name="Password" className="validate" />

              </div>
              <div className="card-action">
                <div className="row valign-wrapper">
                  <div className="col s5">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                    Register <i className="material-icons right">send</i>
                    </button>
                  </div>
                  <div className="col s7">
                    <Link to="/login">Registered? Log in</Link>
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
