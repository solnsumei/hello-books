import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BorrowedItem = ({ borrowedBook, page, action }) => {
  const returned = !borrowedBook.returned ?
    <button
      onClick={action}
      className="btn waves-effect waves-light blue">
      Return
    </button> : '';

  return (
    <tr>
      <td>{borrowedBook.book.isDeleted ? borrowedBook.book.title :
        <Link to={`/books/${borrowedBook.bookId}`}>
          {borrowedBook.book.title}</Link>
      }
      </td>
      <td>{moment(borrowedBook.borrowDate).format('MMM Do YY')}</td>
      <td>{moment(borrowedBook.dueDate).format('MMM Do YY')}</td>
      <td>{borrowedBook.returned ? 'yes' : 'no'}</td>
      <td>{borrowedBook.returnDate !== null ? moment(borrowedBook.returnDate).format('MMM Do YY') : ''}</td>
      <td>{returned}</td>
    </tr>
  );
};

BorrowedItem.propTypes = {
  borrowedBook: PropTypes.object.isRequired,
};

export default BorrowedItem;
