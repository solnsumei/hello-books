import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * Book list component
 * renders the book list for
 * the catalog page
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const BookList = ({ books, link }) => (
  <div className="row">
    { books.length > 0 ?
      books.map(book =>
        <Book key={book.id} book={book} link={link} />
      ) :

      <div className="col s12">
        <p className="white-text">No book added</p>
      </div>
    }
  </div>
);

BookList.propTypes = {
  books: PropTypes.array,
  link: PropTypes.string
};

export default BookList;
