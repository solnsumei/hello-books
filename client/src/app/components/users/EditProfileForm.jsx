import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

/**
 * Edit profile form
 * renders form for editing user profile
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const EditProfileForm = ({ user, onSubmit,
  closeForm, onChange, loading, errors }) => (
  <div className="col s12">
    <div className="card">
      <form onSubmit={onSubmit}>
        <div className="card-content row">
          <span className="card-title">
            <a href="#" title="cancel" onClick={closeForm} className="right">
              <small className="right-align">
                <i className="material-icons">close</i>
              </small>
            </a>
          </span>
          <div className="col s12 m6 offset-m3">
            <h3>
              Edit Profile
            </h3>
            <div className="divider"></div>
            <br />

            { Object.keys(errors).length > 0 ?
              <p className="red-text">** There are some errors with your input</p>
              : ''
            }

            <TextInput type="text" name="firstName" label="First name" active={true}
              value={user.firstName} onChange={onChange} error={errors.firstName ? errors.firstName[0] : null}
              errorMsg="This field is required" required="required" />

            <TextInput type="text" name="surname" active={true} label="Surname"
              value={user.surname} onChange={onChange} error={errors.surname ? errors.surname[0] : null }
              errorMsg="This field is required" required="required" />

            <br/>
            <br/>
            <p className="center-align">
              <button className="btn waves-effect waves-light"
                type="submit">Save
              </button>
            </p>
            <br/>
            <br/>
          </div>
        </div>
      </form>
    </div>
  </div>
);

EditProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default EditProfileForm;
