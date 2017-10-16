import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';


const SignUpForm = ({ formParams, onSubmit, onChange, loading, errors }) => (
  <div className="col s12 m8 offset-m2 l8 offset-l2">
    <h5 className="center-align teal-text">Create An Account</h5>
    <div className="card login-form">
      <form onSubmit={onSubmit}>
        <div className="card-content">

          { Object.keys(errors).length > 0 ?
            <p className="red-text">** There are some errors with your input</p>
            : ''
          }

          <TextInput type="text" name="username" label="Username"
            value={formParams.username} onChange={onChange} error={errors.username}
            prefix="account_box"
            errorMsg="This field is required" required="required" />

          <TextInput type="email" name="email" label="Email"
            prefix="email"
            value={formParams.email} onChange={onChange} error={errors.email}
            errorMsg="Email is invalid" required="required" />

          <TextInput type="password" name="password" label="Password"
            value={formParams.password} onChange={onChange}
            prefix="lock"
            error={errors.password}
            errorMsg="This field is required" required="required" />

          <section className="row">
            <div className="col s12">
              <h3>Personal Details</h3>
            </div>

            <div className="col s12 m6">
              <TextInput type="text" name="firstName" label="First name"
                value={formParams.firstName} onChange={onChange} error={errors.firstName}
                errorMsg="This field is required" required="required" />
            </div>

            <div className="col s12 m6">
              <TextInput type="text" name="surname" label="Surname"
                value={formParams.surname} onChange={onChange} error={errors.surname}
                errorMsg="This field is required" required="required" />
            </div>
          </section>

        </div>
        <div className="card-action">
          <div className="row">
            <div className="col s12 center-align">
              <button className="btn waves-effect waves-light"
                type="submit" name="action">
              Sign up <i className="material-icons right">send</i>
              </button>
            </div>
            <div className="col s12">
              <br/>
              Already registered? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

SignUpForm.propTypes = {
  formParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default SignUpForm;
