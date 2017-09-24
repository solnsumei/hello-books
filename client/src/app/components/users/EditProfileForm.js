import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const EditProfileForm = ({ user, onSubmit, membershipTypes,
  closeForm, onChange, loading, errors }) => (
  <form onSubmit={onSubmit} className="col s12 m4">
    <div className="card">
      <div className="card-content">
        <span className="card-title">
          Edit Profile
          <a href="#" title="cancel" onClick={closeForm} className="right">
            <small className="right-align">
              <i className="material-icons">close</i>
            </small>
          </a>
        </span>
        <div className="divider"></div>
        <br />

        { Object.keys(errors).length > 0 ?
          <p className="red-text">** There are some errors with your input</p>
          : ''
        }

        <TextInput type="text" name="firstName" label="First name" active={true}
          value={user.firstName} onChange={onChange} error={errors.firstName}
          errorMsg="This field is required" required="required" />

        <TextInput type="text" name="surname" active={true} label="Surname"
          value={user.surname} onChange={onChange} error={errors.surname}
          errorMsg="This field is required" required="required" />

        <SelectInput
          name="membershipType"
          active={true}
          label="Membership Type"
          value={user.membershipType}
          defaultOption="Select Membership Type"
          options={membershipTypes}
          onChange={onChange}
          error={errors.membershipType} />

      </div>
      <div className="card-action">
        <div className="row valign-wrapper">
          <div className="col s12">
            <button className="btn waves-effect waves-light"
              type="submit" name="action">Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
);

EditProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default EditProfileForm;
