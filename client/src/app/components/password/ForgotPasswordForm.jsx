import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

/**
 * @returns {object} component
 */
const ForgotPasswordForm = ({ resetParams, onSubmit, onChange, errors }) => (
  <div className="col s12 m6 offset-m3">
    <div className="card login-form">
      <h3 className="center-align">
        <i className="material-icons large">local_library</i>
      </h3>
      <h3 className="center-align">Forgot Password</h3>
      <p className="white-text center-align">
      Please enter your email or username to reset your password
      </p>
      <form onSubmit={onSubmit}>
        <div className="card-content">
          {(errors && errors.error) &&
            <p className="red-text">
              ** {errors.error}
              <br/> <br/>
            </p>
          }

          <TextInput type="text" name="entry" label="Enter Username or Email"
            value={resetParams.entry} onChange={onChange}
            error={errors.entry ? errors.entry[0] : null}
            errorMsg="This field is required" required="required" />

        </div>
        <p className="center-align">
          <button className="btn waves-effect waves-light"
            type="submit" name="action">
            Submit
          </button>
          <br/>
          <br/>
          <br />
          <br />
        </p>
      </form>
    </div>
  </div>
);

ForgotPasswordForm.propTypes = {
  resetParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  errorMsg: PropTypes.string
};

export default ForgotPasswordForm;
