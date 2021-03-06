import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import bookActions from '../../actions/bookActions';
import borrowActions from '../../actions/borrowActions';
/**
  * Book details page
 * @extends React.Component
 */
export class BookDetailPage extends React.Component {
  /**
   * Book detail constructor
   * @method constructor
   * @param  {Object} props react properties
   * 
   * @return {void} set default states and bind functions
   */
  constructor(props) {
    super(props);

    this.state = {
      isBorrowed: this.props.isBorrowed
    };

    this.confirmAction = this.confirmAction.bind(this);
  }

  /**
   * React lifecycle method
   * calls the getBook function
   * @method componentDidMount
   * 
   * @return {void}
   */
  componentDidMount() {
    this.props.getBook(this.props.bookId);
    $('.modal').modal();
  }

  /**
   * React lifecycle method
   * @method componentWillReceiveProps
   * @param  {Object} nextProps
   * 
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.isBorrowed !== nextProps.isBorrowed) {
      // Necessary to populate options when existing book is loaded directly
      this.setState({ isBorrowed: nextProps.isBorrowed });
    }
  }

  /**
   * Class method to confirm borrow action
   * closes modal rendered
   * @param {String} action
   * @method confirmBorrow
   * 
   * @return {void}
   */
  confirmAction(action) {
    const { book } = this.props;

    this.props.performAction(action, book.id);

    $('.modal').modal('close');
  }

  /**
  * Renders the book detail page

  * @return {Object} jsx
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
            <p>({book.category.name})</p>
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
                Return
              </button>}

            <p><Link to="/books">Back to Catalog</Link></p>
          </div>
          <Modal id="modal1"
            title={!this.state.isBorrowed ? 'Confirm Borrow' : 'Confirm Return'}
            text={!this.state.isBorrowed ?
              'Do you want to borrow this book?' :
              'Do you want to return this book?' }
            action={() => (!this.state.isBorrowed ? this.confirmAction(actionTypes.BORROW_BOOK) :
              this.confirmAction(actionTypes.RETURN_BOOK))}
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

/**
 * Checks if book is already borrowed by user
 * @param {array} borrowedBooks 
 * @param {number} id
 * 
 * @returns {boolean} true or false
 */
const inBorrowedList = (borrowedBooks, id) => {
  const foundInList = borrowedBooks.filter(borrowedBook =>
    borrowedBook.bookId === id && !borrowedBook.returned);

  if (foundInList[0]) return true;
  return false;
};

/**
 * Gets a book from the redux state
 * @param {array} books 
 * @param {number} id
 * 
 * @returns {Object|null} book or null
 */
const getBookById = (books, id) => {
  const foundBook = books.filter(book => book.id === id);
  // since filter returns an array, you have to grab the first
  if (foundBook && foundBook.length > 0) return foundBook[0];
  return null;
};

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => {
  // from the path '/books/:id'
  const bookId = ownProps.match.params.id;

  const book = getBookById(state.books, (parseInt(bookId, 10)));

  const isBorrowed = inBorrowedList(state.borrowedBooks, (parseInt(bookId, 10))) || false;

  return ({
    user: state.user,
    book,
    bookId,
    isBorrowed
  });
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  getBook: bookId => dispatch(bookActions(actionTypes.GET_BOOK, bookId)),
  performAction: (action, bookId) =>
    dispatch(borrowActions(action, bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
