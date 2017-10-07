import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookList = ({ books, link }) => (
  <div className="row">
    { Object.keys(books).length > 0 ?
      books.map(book =>
        <Book key={book.id} book={book} link={link} />
      ) :

      <p>No book added</p>

    }
  </div>
);

BookList.propTypes = {
  books: PropTypes.array,
  link: PropTypes.string
};

export default BookList;
