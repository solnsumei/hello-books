import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookForm from './BookForm';
import actionTypes from '../../../actions/actionTypes';
import bookActions from '../../../actions/bookActions';

/**
 * [className description]
 * @type {String}
 */
class ManageBookPage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      book: Object.assign({}, this.props.book),
      errors: {}
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.uploadCoverPicture = this.uploadCoverPicture.bind(this);
  }

  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    if (this.props.bookId) {
      this.props.getBook(this.props.bookId);
    }
  }

  /**
   * [componentWillReceiveProps description]
   * @method componentWillReceiveProps
   * @param  {[type]}                  nextProps [description]
   * @return {[type]}                            [description]
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.book.id !== nextProps.book.id) {
      // Necessary to populate form when existing book is loaded directly
      this.setState({ book: Object.assign({}, nextProps.book) });
    }
  }

  /**
   * [uploadCoverPicture description]
   * @method uploadCoverPicture
   * @return {null} [description]
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
   * @param {Object} event
   * @returns {Object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const book = this.state.book;
    book[field] = event.target.value;
    return this.setState({ book });
  }

  /**
   * [saveCategory description]
   * @method saveCategory
   * @param  {Object} event [description]
   * @return {null} [description]
   */
  saveBook(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.saveBook(this.state.book)
      .then(() => {
        this.props.history.replace('/admin/books');
      })
      .catch(({ response }) => {
        if (response.data.error.errors) {
          this.setState({ errors: response.data.error.errors });
        }
      });
  }

  /**
   * [render description]
   * @method render
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

const getBookById = (books, id) => {
  const foundBook = books.filter(book => book.id === id);
  // since filter returns an array, you have to grab the first
  if (foundBook) return foundBook[0];
  return null;
};

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

  if (bookId && state.books.length > 0) {
    book = getBookById(state.books, (parseInt(bookId, 10)));
  }

  return ({
    bookId,
    categories: categoriesFormatted,
    book
  });
};

const mapDispatchToProps = dispatch => ({
  getBook: bookId =>
    dispatch(bookActions(actionTypes.GET_BOOK, null, bookId)),
  saveBook: book =>
    dispatch(bookActions(actionTypes.SAVE_OR_UPDATE_BOOK, book))
});

ManageBookPage.propTypes = {
  book: PropTypes.object,
  categories: PropTypes.array,
  saveBook: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
