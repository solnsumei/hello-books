import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

/**
 * Reset password form
 * renders the reset password form
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const ResetPasswordForm = ({ resetParams, onSubmit, onChange, errors }) => (
  <div className="col s12 m6 offset-m3">
    <div className="card login-form">
      <h3 className="center-align">
        <i className="material-icons large">local_library</i>
      </h3>
      <h3 className="center-align">Reset your password</h3>
      <p className="white-text center-align">Enter new password</p>
      <form onSubmit={onSubmit}>
        <div className="card-content">
          {(errors && errors.error) &&
            <p className="red-text">
              ** {errors.error}
              <br/> <br/>
            </p>
          }

          <TextInput type="password" name="password" label="Password"
            value={resetParams.password} onChange={onChange}
            error={errors.password ? errors.password[0] : null}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password_confirmation" label="Confirm Password"
            value={resetParams.password_confirmation} onChange={onChange}
            error={errors.password_confirmation ? errors.password_confirmation[0] : null}
            errorMsg="This field is required" required="required" />

        </div>
        <div className="card-action">
          <div className="row">
            <div className="col s12 center-align">
              <button className="btn waves-effect waves-light"
                type="submit" name="action">
              Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  resetParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  errorMsg: PropTypes.string
};

export default ResetPasswordForm;
