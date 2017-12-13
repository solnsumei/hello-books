import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Pagination from '../common/Pagination';
import actionTypes from '../../actions/actionTypes';
import bookActions from '../../actions/bookActions';
import borrowActions from '../../actions/borrowActions';
import BookList from './BookList';
/**
 *
 */
export class CatalogPage extends React.Component {
  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (parseInt(this.props.queryParams.page, 10)) {
      this.props.loadBooks(this.props.queryParams.page, this.props.perPage);
    } else {
      this.props.loadBooks(null, this.props.perPage);
    }
  }

  /**
     * 
     * @param {any} nextProps 
     * @memberof BooksPage
     * @returns {void}
     */
  componentWillReceiveProps(nextProps) {
    if (this.props.queryParams.page !== nextProps.queryParams.page) {
      this.props.loadBooks(nextProps.queryParams.page, nextProps.perPage);
    }
  }

  /**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div className="book-page">
        <div className="row">
          <div className="col s12">
            <h3 className="center-align">Book Catalog</h3>
            <div className="divider"></div>
          </div>
        </div>
        <BookList books={this.props.books} link="/books/"/>
        {(this.props.itemCount > this.props.perPage) &&
          <Pagination
            itemCount={this.props.itemCount}
            perPage={this.props.perPage}
            pageNumber={this.props.queryParams.page}
            pageUrl={this.props.location.pathname}
          />
        }
      </div>
    );
  }
}

// Map state from store to component properties
const mapStateToProps = (state, ownProps) => {
  const queryParams = queryString.parse(ownProps.location.search);

  return {
    perPage: 2,
    itemCount: state.itemCount.books,
    queryParams,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => ({
  loadBooks: (page, limit) => dispatch(bookActions(actionTypes.LOAD_BOOKS, page, limit)),
});

CatalogPage.propTypes = {
  books: PropTypes.array,
  loadBooks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
