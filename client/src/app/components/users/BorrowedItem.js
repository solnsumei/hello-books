import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../helpers/constants';

const BorrowedItem = ({ borrowedBook, page, action }) => {
  const historyPage = page ? <td>{borrowedBook.returned ? 'yes' : 'no'}</td> : null;

  const returned = !borrowedBook.returned ?
    <button
      onClick={action}
      className="btn waves-effect waves-light blue">
      Return
    </button> : '';

  return (
    <tr>
      <td>{borrowedBook.Book.isDeleted ? borrowedBook.Book.title :
        <Link to={`/books/${borrowedBook.bookId}`}>
          {borrowedBook.Book.title}</Link>
      }
      </td>
      <td>{formatDate(borrowedBook.createdAt)}</td>
      <td>{formatDate(borrowedBook.dueDate)}</td>
      {historyPage}
      <td>
        { returned }
      </td>
    </tr>
  );
};

BorrowedItem.propTypes = {
  borrowedBook: PropTypes.object.isRequired,
};

export default BorrowedItem;
