import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const MembershipTypeModal = ({ membershipType, onSubmit, errors, onChange }) => {
  const active = true;
  return (
    <div id="membership-modal" className="modal">
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h4>Edit Membership Type ({membershipType.membershipType})</h4>

          { Object.keys(errors).length > 0 && <p>** There are some errors with your input</p> }

          <TextInput
            type="number"
            name="lendDuration"
            label="Lend Duration(Days)"
            value={membershipType.lendDuration}
            className="validate"
            onChange={onChange}
            error={errors.lendDuration}
            active={active}
            errorMsg="This field is required"
            required="required"
          />

          <TextInput
            type="number"
            name="maxBorrowable"
            label="Maximum Book Borrowable"
            value={membershipType.maxBorrowable}
            className="validate"
            onChange={onChange}
            error={errors.maxBorrowable}
            active={active}
            errorMsg="This field is required"
            required="required"
          />

        </div>
        <div className="modal-footer">
          <button type="button"
            className="modal-action modal-close waves-effect waves-green btn-flat">
            Cancel
          </button>

          <button type="submit" className="waves-effect waves-green btn-flat">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

MembershipTypeModal.propTypes = {
  membershipType: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  active: PropTypes.bool
};

export default MembershipTypeModal;
