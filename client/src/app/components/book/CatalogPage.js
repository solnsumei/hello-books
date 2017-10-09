import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookList from './BookList';
/**
 *
 */
class CatalogPage extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <h4 className="center-align">Book Catalog</h4>
          </div>
          <div className="col s6">
            <h4>Book Catalog</h4>
          </div>
        </div>
        <BookList books={this.props.books} link="/books/"/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.books
});

export default connect(mapStateToProps)(CatalogPage);
