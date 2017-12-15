import React from 'react';
import PropTypes from 'prop-types';
import CategoryListRow from './CategoryListRow';

/**
 * Category list react component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const CategoryList = ({ categories, onEdit, onDelete }) => (
  <table className="responsive-table striped bordered">
    <thead>
      <tr>
        <th>Category Name</th>
        <th>Slug</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { categories.length > 0 ?
        categories.map(category =>
          <CategoryListRow key={category.id} onClickEdit={() => onEdit(category)}
            onClickDelete={() => onDelete(category)} category={category} />
        ) :
        <tr>
          <td colSpan="3" className="center-align">
            No item found
          </td>
        </tr>
      }
    </tbody>
  </table>
);

CategoryList.propTypes = {
  categories: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CategoryList;
