import React from 'react';
import PropTypes from 'prop-types';

const BookListRow = ({ book, onClickEdit, onClickDelete }) => (
  <tr>
    <td>{book.name}</td>
    <td>{book.category.name}</td>
    <td>{book.author}</td>
    <td>{book.stockQuantity}</td>
    <td>{book.quantityBorrowed}</td>
    <td>{book.createdAt}</td>
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

BookListRow.propTypes = {
  book: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
};

export default BookListRow;
