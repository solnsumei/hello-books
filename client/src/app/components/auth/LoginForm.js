import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';

/**
 * @returns {object} component
 */
const LoginForm = ({ loginParams, onSubmit, onChange, errors, loading }) => (
  <div className="col s12 m8 offset-m2 l8 offset-l2">
    <h5 className="center-align teal-text">Login to your Account</h5>
    <div className="card login-form">
      <form onSubmit={onSubmit}>
        <div className="card-content">
          {(errors && errors.error) &&
            <p className="red-text">
              **Login failed! {errors.error}
              <br/> <br/>
            </p>
          }

          <TextInput type="text" name="username" label="Username"
            value={loginParams.username} onChange={onChange} error={errors.username}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password" label="Password"
            value={loginParams.password} onChange={onChange} error={errors.password}
            errorMsg="This field is required" required="required" />

        </div>
        <div className="card-action">
          <div className="row">
            <div className="col s12 center-align">
              <button className="btn waves-effect waves-light"
                type="submit" name="action">
              Log in <i className="material-icons right">lock</i>
              </button>
            </div>
            <div className="col s12 center-align">
              <br/>
                New to Hello books? <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  loginParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  errorMsg: PropTypes.string
};

export default LoginForm;
