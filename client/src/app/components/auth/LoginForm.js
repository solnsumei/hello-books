import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';

/**
 * @returns {object} component
 */
const LoginForm = ({ loginParams, onSubmit, onChange, errors, loading }) => (
  <form className="col s12 m6 offset-m3" onSubmit={onSubmit}>
    <div className="card">
      <div className="card-content">
        <span className="card-title">Login</span>

        <div className="divider"></div>
        <br />

        {(errors && errors.error) &&
          <p className="red-text">
            **Login Failed! {errors.error}
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
