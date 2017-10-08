import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      <td><Link to={`/books/${borrowedBook.bookId}`}>
        {borrowedBook.Book.title}</Link>
      </td>
      <td>{borrowedBook.createdAt}</td>
      <td>{borrowedBook.dueDate}</td>
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
