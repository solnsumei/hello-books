import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Book = ({ book, link }) => (
  <div className="col s12 m4">
    <div className="card horizontal">
      <div className="card-image">
        <Link to={`${link}${book.id}`}>
          <img src={book.coverPic} className="img-thumbnail" />
        </Link>
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <h4 className="top white-text">
            <Link to={`${link}${book.id}`}>{book.title}</Link>
          </h4>
          <p className="offset-3">By {book.author}</p>
          <p>({book.category.name})</p>
        </div>
        <div className="card-action">
          <Link to={`${link}${book.id}`}>Details »</Link>
        </div>
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
