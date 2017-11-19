import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionTypes from '../../actions/actionTypes';
import bookActions from '../../actions/bookActions';
import borrowActions from '../../actions/borrowActions';
import BookList from './BookList';
/**
 *
 */
class CatalogPage extends React.Component {
  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    this.props.loadBooks();
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.books.sort((a, b) => (b.id - a.id))
});

const mapDispatchToProps = dispatch => ({
  loadBooks: () => dispatch(bookActions(actionTypes.LOAD_BOOKS)),
});

CatalogPage.propTypes = {
  books: PropTypes.array,
  loadBooks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
