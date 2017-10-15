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
          <div className="col s12">
            <h3 className="center-align teal-text">Book Catalog</h3>
            <div className="divider"></div>
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
