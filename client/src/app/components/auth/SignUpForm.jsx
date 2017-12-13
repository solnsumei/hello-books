import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';


const SignUpForm = ({ formParams, onSubmit, onChange, errors, responseGoogle }) => (
  <div className="col s12 m8 offset-m2 l8 offset-l2">
    <div className="card login-form">
      <h3 className="center-align">
        <i className="material-icons large">local_library</i>
      </h3>
      <h3 className="center-align">Create an account</h3>
      <form onSubmit={onSubmit}>
        <div className="card-content">

          { Object.keys(errors).length > 0 ?
            <p className="red-text">** There are some errors with your input</p>
            : ''
          }

          <TextInput type="text" name="username" label="Username"
            value={formParams.username} onChange={onChange}
            error={errors.username ? errors.username[0] : null}
            prefix="account_box"
            errorMsg="This field is required" required="required" />

          <TextInput type="email" name="email" label="Email"
            prefix="email"
            value={formParams.email} onChange={onChange}
            error={errors.email ? errors.email[0] : null}
            errorMsg="Email is invalid" required="required" />

          <TextInput type="password" name="password" label="Password"
            value={formParams.password} onChange={onChange}
            prefix="lock"
            error={errors.password ? errors.password[0] : null}
            errorMsg="This field is required" required="required" />

          <section className="row">
            <div className="col s12">
              <h5>Personal Details</h5>
            </div>

            <div className="col s12 m6">
              <TextInput type="text" name="firstName" label="First name"
                value={formParams.firstName} onChange={onChange}
                error={errors.firstName ? errors.firstName[0] : null}
                errorMsg="This field is required" required="required" />
            </div>

            <div className="col s12 m6">
              <TextInput type="text" name="surname" label="Surname"
                value={formParams.surname} onChange={onChange}
                error={errors.surname ? errors.surname[0] : null}
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

            <div className="col s12 center-align margin-2x">
              <GoogleLogin
                clientId="603786638407-v7faeg0ols8666e48dduchf3muvucirq.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}>
                Sign Up with Google
              </GoogleLogin>
            </div>

            <div className="col s12 center-align link">
              <br/>
              <Link to="/login">Already registered? Log in</Link>
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
  errors: PropTypes.object
};

export default SignUpForm;
