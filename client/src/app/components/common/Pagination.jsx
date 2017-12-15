import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Pagination component
 * renders pagination on pages
 * with high number of items
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const Pagination = ({ pageNumber, itemCount, perPage, pageUrl }) => {
  pageNumber = parseInt(pageNumber, 10);
  if (!pageNumber || pageNumber < 1) {
    pageNumber = 1;
  }
  const hasNextPage = ((itemCount / pageNumber) > perPage) ? false : 'disabled';
  const thisPage = parseInt(pageNumber, 10);
  const isFirstPage = pageNumber <= 1 ? 'disabled' : false;
  const nextPageNumber = !hasNextPage ? thisPage + 1 : pageNumber;
  const prevPageNumber = pageNumber > 1 ? (pageNumber - 1) : 1;

  return (
    <div className="row">
      <div className="col s12 center-align">
        <Link title="previous" to={`${pageUrl}?page=${prevPageNumber}`} disabled={isFirstPage} className="btn-floating btn-large waves-effect waves-light bg-primary">
          <i className="material-icons">chevron_left</i>
        </Link>
        &nbsp;
        <Link title="next" to={`${pageUrl}?page=${nextPageNumber}`} disabled={hasNextPage} className="btn-floating btn-large waves-effect waves-light bg-primary">
          <i className="material-icons">chevron_right</i>
        </Link>
        <div className="margin-2x"></div>
      </div>
    </div>
  );
};

Pagination.PropTypes = {
  pageNumber: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  pageUrl: PropTypes.string.isRequired
};

export default Pagination;
