import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import BookList from './BookList';
import { saveBook } from '../../../actions/bookActions';

/**
 * [className description]
 * @type {String}
 */
class BooksPage extends React.Component {
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <p className="card-title teal-text">
                  <b>Book List</b>
                  <span className="right">
                    <Link to="/admin/books/create">
                      <button className="btn-floating waves-effect waves-green">
                        <i className="material-icons">add</i>
                      </button>
                    </Link>
                  </span>
                </p>
                <br/>
                <div className="divider"></div>
                <BookList
                  books={this.props.books}
                  onEdit={this.onEdit}
                  onDelete={this.onDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.books
});

BooksPage.propTypes = {
  books: PropTypes.array,
};

export default connect(mapStateToProps)(BooksPage);
