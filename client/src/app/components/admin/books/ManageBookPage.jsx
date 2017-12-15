import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookForm from './BookForm';
import actionTypes from '../../../actions/actionTypes';
import bookActions from '../../../actions/bookActions';
import categoryActions from '../../../actions/categoryActions';

/**
 * Adds and updates books copmponent
 * @type {String}
 */
export class ManageBookPage extends React.Component {
  /**
   * ManageBookPage constructor
   * @method constructor
   * @param  {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      book: { ...this.props.book },
      errors: {}
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.uploadCoverPicture = this.uploadCoverPicture.bind(this);
  }

  /**
   * Functions called when components has mounted
   * @method componentDidMount
   * 
   * @return {void}
   */
  componentDidMount() {
    if (this.props.bookId) {
      this.props.getBook(this.props.bookId);
    }
    this.props.loadCategories();
  }

  /**
   * Components receives new props
   * @method componentWillReceiveProps
   * @param  {Object} nextProps
   * 
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.book.id !== nextProps.book.id) {
      // Necessary to populate form when existing book is loaded directly
      this.setState({ book: { ...nextProps.book } });
    }
  }

  /**
   * Upload cover picture to cloudibary
   * @method uploadCoverPicture
   * 
   * @return {void}
   */
  uploadCoverPicture() {
    const book = this.state.book;
    const params = {
      cloud_name: 'solmei',
      upload_preset: 'amoosw0e',
      multiple: false
    };

    /* eslint-disable */
    cloudinary.openUploadWidget(params,
      /* eslint-enable */
      (error, result) => {
        if (error) {
          return;
        }

        book.coverPic = result[0].url;

        return this.setState({ book });
      });
  }

  /**
   * Updates the form state
   * @param {Object} event
   * 
   * @returns {Object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const book = this.state.book;
    book[field] = event.target.value;
    return this.setState({ book });
  }

  /**
   * Save category
   * @method saveCategory
   * @param  {Object} event
   * 
   * @return {void}
   */
  saveBook(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.saveBook(this.state.book)
      .then(() => {
        this.props.history.replace('/admin/books');
      })
      .catch(({ response }) => this.setState({ errors: response.data.errors }));
  }

  /**
   * Renders page object
   * @method render
   * 
   * @return {Object} jsxObject
   */
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <BookForm
            book={this.state.book}
            categories={this.props.categories}
            onSubmit={this.saveBook}
            uploadCoverPic={this.uploadCoverPicture}
            onChange={this.updateFormState}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

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
  if (foundBook) return foundBook[0];
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

  // Initialize book
  let book = {
    id: '',
    title: '',
    author: '',
    stockQuantity: '',
    coverPic: '',
    coverPicId: '',
    description: '',
    categoryId: ''
  };

  // format categories
  const categoriesFormatted = state.categories.map(category => (
    {
      value: category.id,
      text: category.name
    }));

  if (bookId) {
    book = getBookById(state.books, (parseInt(bookId, 10)));
  }

  return ({
    bookId,
    categories: categoriesFormatted,
    book
  });
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  getBook: bookId =>
    dispatch(bookActions(actionTypes.GET_BOOK, bookId)),
  saveBook: book =>
    dispatch(bookActions(actionTypes.SAVE_OR_UPDATE_BOOK, book)),
  loadCategories: () => dispatch(categoryActions(actionTypes.LOAD_CATEGORIES, null, 100))
});

ManageBookPage.propTypes = {
  book: PropTypes.object,
  categories: PropTypes.array,
  saveBook: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
