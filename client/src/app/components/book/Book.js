import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Book = ({ book, link }) => (
  <div className="col s12 m4">
    <div className="row">
      <div className="col s4 m5">
        <Link to={`${link}${book.id}`}>
          <img src={book.coverPic} className="img-thumbnail" />
        </Link>
      </div>
      <div className="col s8 m7">
        <h4 className="top">
          <Link to={`${link}${book.id}`}>{book.title}</Link>
        </h4>
        <div className="book-details">
          <p className="offset-3">By {book.author}</p>
          <p>({book.Category.name})</p>
        </div>
        <p> <Link to={`${link}${book.id}`}>Details »</Link></p>
      </div>
    </div>
    <div className="margin-2x"></div>
  </div>
);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
};

export default Book;
