import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import TextInput from '../common/TextInput';

/**
 * @returns {object} component
 */
const LoginForm = ({ loginParams, onSubmit, onChange, errors, responseGoogle }) => (
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
            value={loginParams.username} onChange={onChange}
            error={errors.username ? errors.username[0] : null}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password" label="Password"
            value={loginParams.password} onChange={onChange}
            error={errors.password ? errors.password[0] : null}
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
            <div className="col s12 center-align margin-2x">
              <GoogleLogin
                clientId="603786638407-v7faeg0ols8666e48dduchf3muvucirq.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}>
                Sign in with Google
              </GoogleLogin>
            </div>
            <div className="col s12 center-align link">
              <br/>
              <Link to="/register">New to Hello books? Sign up</Link>
            </div>
            <div className="col s12 center-align link">
              <Link to="/forgot-password">Forgot password</Link>
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
  errors: PropTypes.object,
  errorMsg: PropTypes.string
};

export default LoginForm;
