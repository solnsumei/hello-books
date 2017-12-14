import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Pagination from '../../common/Pagination';
import BookList from './BookList';
import AddQuantityModal from './AddQuantityModal';
import Modal from '../../common/Modal';
import actionTypes from '../../../actions/actionTypes';
import bookActions from '../../../actions/bookActions';

/**
 * Books page
 * Handles fetching books
 * adding quantity to book
 * deleting book
 * @type {Object}
 */
export class BooksPage extends React.Component {
  /**
   * Books page contructor
   * @method constructor
   * @param  {Object} props - initial props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      quantity: 1,
      error: ''
    };

    this.updateQuantityFormState = this.updateQuantityFormState.bind(this);
    this.saveQuantity = this.saveQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.onClickDeleteBook = this.onClickDeleteBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  /**
   * Component did mount function
   * Fetches all books and handle pagination functions
   * @method componentDidMount
   * 
   * @return {void}
   */
  componentDidMount() {
    if (parseInt(this.props.queryParams.page, 10)) {
      this.props.loadBooks(this.props.queryParams.page, this.props.perPage);
    } else {
      this.props.loadBooks(null, this.props.perPage);
    }
    $('.modal').modal();
  }

  /**
     * @description Triggers when component is about to have new props
     * @param {any} nextProps 
     * @memberof BooksPage
     * 
     * @returns {void}
     */
  componentWillReceiveProps(nextProps) {
    if ((this.props.queryParams.page !== nextProps.queryParams.page) ||
      (this.props.books.length !== nextProps.books.length)) {
      this.props.loadBooks(nextProps.queryParams.page, nextProps.perPage);
    }
  }

  /**
   * Add quantity to book
   * @method addQuantity
   * @param  {Object} book
   * 
   * @return {void}
   */
  addQuantity(book) {
    this.setState({
      book: Object.assign({}, book),
      quantity: 1,
      error: ''
    });

    $('#add-quantity-modal').modal('open');
  }

  /**
   * delete a book from library
   * @method deleteBook
   * 
   * @return {void}
   */
  deleteBook() {
    this.props.deleteBook(this.state.book);
  }

  /**
   * Open modal to confirm delete book
   * @method onClickDeleteBook
   * @param  {Object} book
   * 
   * @return {void}
   */
  onClickDeleteBook(book) {
    this.setState({
      book: { ...book }
    });

    $('#delete-book-modal').modal('open');
  }

  /**
   * Update quantity in state
   * @param {object} event
   * 
   * @returns {object} state
   */
  updateQuantityFormState(event) {
    const quantity = event.target.value;
    if (!quantity || quantity <= 0) return this.setState({ quantity: 1 });
    return this.setState({ quantity });
  }

  /**
   * Saves quantity
   * @method saveCategory
   * @param  {Object} event
   * 
   * @return {Object} state
   */
  saveQuantity(event) {
    event.preventDefault();
    this.setState({ error: '' });
    this.props.addStockQuantity(this.state.book, this.state.quantity)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ quantity: 1 });
      })
      .catch(({ response }) =>
        this.setState({ error: response.data.error }));
  }

  /**
   * renders the page
   * @method render
   * 
   * @return {Object} html
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <BookList
                  books={this.props.books}
                  onClickAddQuantity={this.addQuantity}
                  onDelete={this.onClickDeleteBook}
                />
                <div className="fixed-action-btn">
                  <Link to="/admin/books/create" title="add new">
                    <button className="btn-floating waves-effect waves-green bg-primary btn-large">
                      <i className="material-icons">add</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {(this.props.itemCount > this.props.perPage) &&
              <Pagination
                itemCount={this.props.itemCount}
                perPage={this.props.perPage}
                pageNumber={this.props.queryParams.page}
                pageUrl={this.props.location.pathname}
              />
            }
            <AddQuantityModal
              quantity={this.state.quantity}
              error={this.state.error}
              onSubmit={this.saveQuantity}
              onChange={this.updateQuantityFormState}
            />

            <Modal
              id="delete-book-modal"
              title="Confirm Delete"
              action={this.deleteBook}
              text={`Do you want to delete book with title ${this.state.book.title}?`}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} object
 */
const mapStateToProps = (state, ownProps) => {
  const queryParams = queryString.parse(ownProps.location.search);

  return {
    perPage: 20,
    itemCount: state.itemCount.books,
    queryParams,
    books: state.books.sort((a, b) => (b.id - a.id))
  };
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {void}
 */
const mapDispatchToProps = dispatch => ({
  addStockQuantity: (book, quantity) =>
    dispatch(bookActions(actionTypes.ADD_STOCK_QUANTITY, book, quantity)),
  loadBooks: (page, limit) =>
    dispatch(bookActions(actionTypes.LOAD_BOOKS, page, limit)),
  deleteBook: book =>
    dispatch(bookActions(actionTypes.DELETE_BOOK, book))
});

BooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  book: PropTypes.object,
  loadBooks: PropTypes.func.isRequired,
  addStockQuantity: PropTypes.func,
  deleteBook: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
