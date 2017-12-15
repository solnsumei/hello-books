import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput';

/**
 * Membership modal react component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const MembershipModal = ({ membership, onSubmit, errors, onChange }) => {
  const active = true;
  return (
    <div id="membership-modal" className="modal">
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h4>Edit Membership Type ({membership.level})</h4>

          <TextInput
            type="number"
            name="lendDuration"
            label="Lend Duration(Days)"
            value={membership.lendDuration}
            className="validate"
            onChange={onChange}
            error={errors.lendDuration ? errors.lendDuration[0] : null}
            active={active}
            errorMsg="This field is required"
            required="required"
          />

          <TextInput
            type="number"
            name="maxBorrowable"
            label="Maximum Book Borrowable"
            value={membership.maxBorrowable}
            className="validate"
            onChange={onChange}
            error={errors.maxBorrowable ? errors.maxBorrowable[0] : null}
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

MembershipModal.propTypes = {
  membership: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  active: PropTypes.bool
};

export default MembershipModal;
