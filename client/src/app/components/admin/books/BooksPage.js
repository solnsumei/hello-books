import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import BookList from './BookList';
import AddQuantityModal from './AddQuantityModal';
import Modal from '../../common/Modal';
import actionTypes from '../../../actions/actionTypes';
import bookActions from '../../../actions/bookActions';

/**
 * [className description]
 * @type {String}
 */
class BooksPage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
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
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    this.props.loadBooks();
  }

  /**
   * ]
   * @method addQuantity
   * @param  {[type]} book [description]
   * @return {[type]}          [description]
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
   * [deleteBook description]
   * @method deleteBook
   * @return {[type]}   [description]
   */
  deleteBook() {
    this.props.deleteBook(this.state.book)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ book: Object.assign({}, {}) });
      })
      .catch(({ response }) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        }
      });
  }

  /**
   * ]
   * @method onClickDeleteBook
   * @param  {[type]} book [description]
   * @return {[type]}          [description]
   */
  onClickDeleteBook(book) {
    this.setState({
      book: Object.assign({}, book)
    });

    $('#delete-book-modal').modal('open');
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateQuantityFormState(event) {
    const quantity = event.target.value;
    if (!quantity || quantity <= 0) return this.setState({ quantity: 1 });
    return this.setState({ quantity });
  }

  /**
   * [saveCategory description]
   * @method saveCategory
   * @param  {[type]} event [description]
   * @return {[type]} [description]
   */
  saveQuantity(event) {
    event.preventDefault();
    this.setState({ error: '' });
    this.props.addStockQuantity(this.state.book, this.state.quantity)
      .then(() => {
        $('.modal').modal('close');
        toastr.success('Quantity added successfully');
        this.setState({ quantity: 1 });
      })
      .catch(({ response }) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        }
      });
  }

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
                <BookList
                  books={this.props.books}
                  onClickAddQuantity={this.addQuantity}
                  onDelete={this.onClickDeleteBook}
                />
                <div className="fixed-action-btn">
                  <Link to="/admin/books/create" title="add new">
                    <button className="btn-floating waves-effect waves-green
                      bg-primary btn-large">
                      <i className="material-icons">add</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
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

// Map state from store to component properties
const mapStateToProps = (state, ownProps) => ({
  books: state.books.sort((a, b) => (b.id - a.id))
});

const mapDispatchToProps = dispatch => ({
  addStockQuantity: (book, quantity) =>
    dispatch(bookActions(actionTypes.ADD_STOCK_QUANTITY, book, null, quantity)),
  loadBooks: book =>
    dispatch(bookActions(actionTypes.LOAD_BOOKS)),
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
