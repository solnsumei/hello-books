import React from 'react';
import PropTypes from 'prop-types';

const CategoryListRow = ({ category, onClickEdit, onClickDelete }) => (
  <tr>
    <td>{category.name}</td>
    <td>{category.slug}</td>
    <td>
      <a title="edit" onClick={onClickEdit} className="btn-floating orange">
        <i className="material-icons">edit</i>
      </a>&nbsp;
      <a title="delete" onClick={onClickDelete} className="btn-floating red">
        <i className="material-icons">delete</i>
      </a>
    </td>
  </tr>
);

CategoryListRow.propTypes = {
  category: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
};

export default CategoryListRow;
