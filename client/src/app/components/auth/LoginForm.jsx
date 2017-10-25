import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';

/**
 * @returns {object} component
 */
const LoginForm = ({ loginParams, onSubmit, onChange, errors, loading }) => (
  <div className="col s12 m6 offset-m3">
    <div className="card login-form">
      <h3 className="center-align">
        <i className="material-icons large">local_library</i>
      </h3>
      <h3 className="center-align">Log in to your account</h3>
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
            <div className="col s12 center-align link">
              <br/>
              <Link to="/register">New to Hello books? Sign up</Link>
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
