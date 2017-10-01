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
    this.onEdit = this.onEdit.bind(this);
  }

  /**
   * ]
   * @method onEdit
   * @param  {[type]} book [description]
   * @return {[type]}          [description]
   */
  onEdit(book) {
    this.setState({
      book: Object.assign({}, book),
      errors: {}
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
            onChange={this.updateFormState}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const categoriesFormatted = state.categories.map(category => (
    {
      value: category.id,
      text: category.name
    }));

  const book = {
    id: '',
    title: '',
    author: '',
    stockQuantity: '',
    coverPic: '',
    description: '',
    categoryId: ''
  };

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
