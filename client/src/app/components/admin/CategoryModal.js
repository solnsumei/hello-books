import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const CategoryModal = ({ category, onSubmit, errors, onChange }) => (
  <div id="category-modal" className="modal">
    <form onSubmit={onSubmit}>
      <div className="modal-content">
        <h4>Add Category</h4>

        { Object.keys(errors).length > 0 ?
          <p className="red-text">** There are some errors with your input</p>
          : ''
        }

        <TextInput type="text" name="name" label="Category Name"
          value={category.name} className="validate" onChange={onChange} error={errors.name}
          errorMsg="This field is required" required="required" />
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

CategoryModal.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default CategoryModal;
