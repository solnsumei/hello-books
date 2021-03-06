import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

/**
 * Change password form component
 * renders form for changing user password
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const ChangePasswordForm = ({ passwordObject, onSubmit, onChange, loading, errors }) => (
  <form onSubmit={onSubmit}>
    <div className="card">
      <div className="card-content row">
        <span className="card-title">
          <Link to="/profile" title="cancel" className="right">
            <small className="right-align">
              <i className="material-icons">close</i>
            </small>
          </Link>
        </span>
        <br />

        <div className="col s12 m6 offset-m3">
          <h3>Change Password</h3>

          <TextInput type="password" name="oldPassword" label="Old Password"
            value={passwordObject.oldPassword} onChange={onChange}
            error={errors.oldPassword ? errors.oldPassword[0] : null}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password" label="New Password"
            value={passwordObject.password} onChange={onChange}
            error={errors.password ? errors.password[0] : null}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password_confirmation"
            label="Confirm Password" value={passwordObject.password_confirmation}
            onChange={onChange}
            error={null}
            errorMsg="This field is required" required="required" />

          <br/>
          <br/>
          <p className="center-align">
            <button className="btn waves-effect waves-light"
              type="submit">Confirm
            </button>
          </p>
          <br/>
          <br/>
        </div>

      </div>
    </div>
  </form>
);

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  passwordObject: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default ChangePasswordForm;
