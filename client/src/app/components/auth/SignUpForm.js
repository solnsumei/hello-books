import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';


const SignUpForm = ({ formParams, onSubmit, onChange, loading, errors }) => (
  <form onSubmit={onSubmit} className="col s12 m6 offset-m3">
    <div className="card">
      <div className="card-content">
        <span className="card-title">Create An Account</span>
        <p>Please fill out the form to register</p>
        <div className="divider"></div>
        <br />

        { Object.keys(errors).length > 0 ?
          <p className="red-text">** There are some errors with your input</p>
          : ''
        }

        <TextInput type="text" name="firstName" label="First name"
          value={formParams.firstName} onChange={onChange} error={errors.firstName}
          errorMsg="This field is required" required="required" />

        <TextInput type="text" name="surname" label="Surname"
          value={formParams.surname} onChange={onChange} error={errors.surname}
          errorMsg="This field is required" required="required" />

        <TextInput type="email" name="email" label="Email"
          value={formParams.email} onChange={onChange} error={errors.email}
          errorMsg="Email is invalid" required="required" />

        <TextInput type="text" name="username" label="Username"
          value={formParams.username} onChange={onChange} error={errors.username}
          errorMsg="This field is required" required="required" />

        <TextInput type="password" name="password" label="Password"
          value={formParams.password} onChange={onChange} error={errors.password}
          errorMsg="This field is required" required="required" />

      </div>
      <div className="card-action">
        <div className="row valign-wrapper">
          <div className="col s5">
            <button className="btn waves-effect waves-light"
              type="submit" name="action">
            Sign up <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="col s7">
            <Link to="/login">Registered? Log in</Link>
          </div>
        </div>
      </div>
    </div>
  </form>
);

SignUpForm.propTypes = {
  formParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default SignUpForm;