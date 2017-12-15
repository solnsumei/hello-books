import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput';

/**
 * Category modal react component
 * shows form to add and update categories
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const CategoryModal = ({ category, onSubmit, errors, onChange }) => {
  let active = true;
  if (!category.slug) {
    active = false;
  }

  return (
    <div id="category-modal" className="modal">
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h4>{ !active ? 'Add Category' : 'Edit Category' }</h4>

          { errors.slug ? <p className="red-text">** {errors.slug} </p> : ''}

          <TextInput
            type="text"
            name="name"
            label="Category Name"
            value={category.name}
            className="validate"
            onChange={onChange}
            error={errors.name ? errors.name[0] : null}
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

CategoryModal.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  active: PropTypes.bool
};

export default CategoryModal;
