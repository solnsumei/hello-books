import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
/**
 *
 */
class BookDetailPage extends React.Component {
  /**
  * [render description]
  * @return {[type]} [description]
  */
  render() {
    const { book, user } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 m5">
            <h3>
              <strong>{book.title}</strong>
            </h3>
            <p className="offset-3"><i>By {book.author}</i></p>

            {book.description}

          </div>

          <div className="col s12 m4">
            <div className="card">
              <div className="card-image">
                <img src={book.coverPic} />
              </div>
            </div>
          </div>

          <div className="col s12 m3">
            <p>({book.Category.name})</p>
            <p>Status: { book.borrowedQuantity < book.stockQuantity ?
              <label className="label label-success">Available</label> :
              <label className="label label-danger">Out of Stock</label>}
            </p>
            {book.borrowedQuantity < book.stockQuantity && !user.admin &&
              <button data-target="modal1" className="btn modal-trigger">
                Borrow
              </button>}
            <p><Link to="/books">Back to Catalog</Link></p>
          </div>
        </div>
        <Modal id="modal1" title="Confirm Borrow" text="Do you want to borrow this book?"/>
      </div>
    );
  }
}

const getBookById = (books, id) => {
  const foundBook = books.filter(book => book.id === id);
  // since filter returns an array, you have to grab the first
  if (foundBook) return foundBook[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
  // from the path '/books/:id'
  const bookId = ownProps.match.params.id;

  let book = {
    Category: {
      name: ''
    }
  };

  if (bookId && state.books.length > 0) {
    book = getBookById(state.books, (Number.parseInt(bookId, 10)));
  }

  return ({
    book,
    user: state.user
  });
};

const mapDispatchToProps = dispatch => ({
  borrow: (user, book) => dispatch(borrowBook(user, book)),
  return: (user, book) => dispatch(returnBook(user, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
