import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookListRow = ({ book, onClickAdd, onClickDelete }) => (
  <tr>
    <td>{book.title}</td>
    <td>{book.Category.name}</td>
    <td>{book.author}</td>
    <td>{book.stockQuantity}</td>
    <td>{book.borrowedQuantity}</td>
    <td>{!book.isDeleted ? 'yes' : 'no'}</td>
    <td>
      <button title="add quantity" onClick={onClickAdd} className="btn-floating bg-primary">
        <i className="material-icons">store</i>
      </button>&nbsp;
      <Link to={`/admin/books/${book.id}`} title="edit" className="btn-floating orange">
        <i className="material-icons">edit</i>
      </Link>&nbsp;
      {!book.isDeleted &&
        <button title="delete" onClick={onClickDelete} className="btn-floating red">
          <i className="material-icons">delete</i>
        </button>}
    </td>
  </tr>
);

BookListRow.propTypes = {
  book: PropTypes.object.isRequired,
  onClickAdd: PropTypes.func,
  onClickDelete: PropTypes.func
};

export default BookListRow;
