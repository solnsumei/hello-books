import React from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import bookActions from '../../actions/bookActions';
import borrowActions from '../../actions/borrowActions';
/**
 *
 */
class BookDetailPage extends React.Component {
  /**
   * Book detail constructor
   * @method constructor
   * @param  {obj} props react properties
   * @return {null} set default states and bind functions
   */
  constructor(props) {
    super(props);

    this.state = {
      isBorrowed: this.props.isBorrowed
    };

    this.confirmBorrow = this.confirmBorrow.bind(this);
    this.confirmReturn = this.confirmReturn.bind(this);
  }

  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    this.props.getBook(this.props.bookId);
  }

  /**
   * [componentWillReceiveProps description]
   * @method componentWillReceiveProps
   * @param  {[type]} nextProps [description]
   * @return {[type]} [description]
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.isBorrowed !== nextProps.isBorrowed) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({ isBorrowed: nextProps.isBorrowed });
    }
  }

  /**
   * [confirmBorrow description]
   * @method confirmBorrow
   * @return {[type]} [description]
   */
  confirmBorrow() {
    const { user, book } = this.props;

    $('.modal').modal('close');

    this.props.borrow(user, book.id)
      .then((response) => {
        this.setState({ isBorrowed: true });
      })
      .catch(({ response }) => toastr.error(response.data.error)
      );
  }

  /**
   * [confirmReturn description]
   * @method confirmReturn
   * @return {[type]} [description]
   */
  confirmReturn() {
    const { user, book } = this.props;

    $('.modal').modal('close');

    this.props.return(user, book.id)
      .then((response) => {
        this.setState({ isBorrowed: false });
      })
      .catch(({ response }) => toastr.error(response.data.error));
  }

  /**
  * [render description]
  * @return {[type]} [description]
  */
  render() {
    const { user, book } = this.props;
    return (
      <div className="book-page white-text">
        { book ? <div className="row">
          <div className="col s12 m5">
            <h3 className="white-text">
              <strong>{book.title}</strong>
            </h3>
            <p className="offset-3"><i>By {book.author}</i></p>

            <p>{book.description}</p>

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
            {book.borrowedQuantity < book.stockQuantity &&
               !user.admin && !this.state.isBorrowed &&
              <button data-target="modal1" className="btn modal-trigger">
                Borrow
              </button>}

            {!user.admin && this.state.isBorrowed &&
              <button data-target="modal1" className="btn modal-trigger">
                Return Book
              </button>}

            <p><Link to="/books">Back to Catalog</Link></p>
          </div>
          <Modal id="modal1"
            title={!this.state.isBorrowed ? 'Confirm Borrow' : 'Confirm Return'}
            text={!this.state.isBorrowed ?
              'Do you want to borrow this book?' :
              'Do you want to return this book?' }
            action={!this.state.isBorrowed ? this.confirmBorrow : this.confirmReturn}
          />
        </div> :
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <h4>Book not found</h4>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const inBorrowedList = (borrowedBooks, id) => {
  const foundInList = borrowedBooks.filter(borrowedBook =>
    borrowedBook.bookId === id && !borrowedBook.returned);

  if (foundInList[0]) return true;
  return false;
};

const getBookById = (books, id) => {
  const foundBook = books.filter(book => book.id === id);
  // since filter returns an array, you have to grab the first
  if (foundBook) return foundBook[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
  // from the path '/books/:id'
  const bookId = ownProps.match.params.id;
  let isBorrowed = false;

  let book = {
    Category: {
      name: ''
    }
  };

  if (bookId && state.books.length > 0) {
    book = getBookById(state.books, (parseInt(bookId, 10)));
  }

  if (bookId && state.borrowedBooks.length > 0) {
    isBorrowed = inBorrowedList(state.borrowedBooks, (parseInt(bookId, 10)));
  }

  return ({
    book,
    bookId,
    user: state.user,
    isBorrowed
  });
};

// map dispatch actions to borrow actions
const mapDispatchToProps = dispatch => ({
  getBook: bookId => dispatch(bookActions(actionTypes.GET_BOOK, null, bookId)),
  borrow: (user, bookId) =>
    dispatch(borrowActions(actionTypes.BORROW_BOOK, user, bookId)),

  return: (user, bookId) =>
    dispatch(borrowActions(actionTypes.RETURN_BOOK, user, bookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
