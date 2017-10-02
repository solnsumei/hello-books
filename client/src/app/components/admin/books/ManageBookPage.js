import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import BookForm from './BookForm';
import { saveBook } from '../../../actions/bookActions';

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
   * [componentWillReceiveProps description]
   * @method componentWillReceiveProps
   * @param  {[type]}                  nextProps [description]
   * @return {[type]}                            [description]
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.book.id !== nextProps.book.id) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({ book: Object.assign({}, nextProps.book) });
    }
  }

  /**
   * [uploadCoverPicture description]
   * @method uploadCoverPicture
   * @return {[type]} [description]
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
          return this.setState({ errors: error });
        }

        book.coverPic = result[0].url;

        return this.setState({ book });
      });
  }

  /**
   * @param {object} event
   * @returns {object} state
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
   * @param  {[type]} event [description]
   * @return {[type]} [description]
   */
  saveBook(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.saveBook(this.state.book)
      .then(() => {
        toastr.success('Book saved successfully');
        this.props.history.replace('/admin/books');
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
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
    book = getBookById(state.books, (Number.parseInt(bookId, 10)));
  }

  return ({
    categories: categoriesFormatted,
    book
  });
};

const mapDispatchToProps = dispatch => ({
  saveBook: book => dispatch(saveBook(book))
});

ManageBookPage.propTypes = {
  book: PropTypes.object,
  categories: PropTypes.array,
  saveBook: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
