import React from 'react';
import PropTypes from 'prop-types';
import BookListRow from './BookListRow';

const BookList = ({ books, onClickAddQuantity, onDelete }) => (
  <table className="responsive-table striped bordered">
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Author</th>
        <th>Stock Qty</th>
        <th>Qty Borrowed</th>
        <th>Enabled</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(books).length > 0 ?
        books.map(book =>
          <BookListRow key={book.id} onClickAdd={selectedBook => onClickAddQuantity(book)}
            onClickDelete={thisBook => onDelete(book)} book={book} />
        ) :
        <tr>
          <td colSpan="7" className="center-align">
            No book added
          </td>
        </tr>
      }
    </tbody>
  </table>
);

BookList.propTypes = {
  books: PropTypes.array,
  onClickAddQuantity: PropTypes.func,
  onDelete: PropTypes.func,
};

export default BookList;
