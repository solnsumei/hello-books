import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput';

/**
 * Add quantity modal react component
 * renders the add quantity form for updating
 * book stock
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const AddQuantityModal = ({ quantity, onSubmit, error, onChange }) => (
  <div id="add-quantity-modal" className="modal">
    <form onSubmit={onSubmit}>
      <div className="modal-content">
        <h4>Add Stock Quantity</h4>
        <br/>
        <TextInput
          type="number"
          name="quantity"
          label="Quantity to Add"
          value={quantity}
          className="validate"
          onChange={onChange}
          error={error}
          active={true}
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

AddQuantityModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default AddQuantityModal;
