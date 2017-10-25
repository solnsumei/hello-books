import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


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
            value={passwordObject.oldPassword} onChange={onChange} error={errors.oldPassword}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="password" label="New Password"
            value={passwordObject.password} onChange={onChange} error={errors.password}
            errorMsg="This field is required" required="required" />

          <TextInput type="password" name="confirmPassword"
            label="Confirm Password" value={passwordObject.confirmPassword}
            onChange={onChange} error={errors.confirmPassword}
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
