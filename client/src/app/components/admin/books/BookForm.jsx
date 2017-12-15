import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

/**
 * Book Form component
 * renders form for adding and updating
 * books
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const BookForm = ({ book, onSubmit, categories, uploadCoverPic, onChange, errors }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <div className="card-content row">
        <h4 className="primary-color">
          {!book.id ? 'Add New Book' : 'Edit Book'}
          <Link to="/admin/books" title="cancel" className="right">
            <small className="right-align">
              <i className="material-icons">close</i>
            </small>
          </Link>
        </h4>

        <TextInput type="text" name="title" label="Book Title"
          value={book.title}
          onChange={onChange} active={book.id !== ''}
          error={errors.title ? errors.title[0] : null}
          errorMsg="This field is required" required="required" />

        <div className="row">
          <div className="col s12 m6">
            <SelectInput
              name="categoryId"
              label="Category"
              value={book.categoryId}
              defaultOption="Select Book Category"
              options={categories}
              onChange={onChange}
              error={errors.categoryId ? errors.categoryId[0] : null } />
          </div>

          <div className="col s12 m6">
            <TextInput type="text" name="author" label="Author"
              value={book.author} active={book.id !== ''} onChange={onChange}
              error={errors.author ? errors.author[0] : null}
              errorMsg="This field is required" required="required" />
          </div>
        </div>

        <br/>

        {!book.id && <TextInput id='stockQuantity'
          type="number" name="stockQuantity" label="Stock Quantity"
          value={book.stockQuantity}
          active={book.id !== ''} onChange={onChange}
          error={errors.stockQuantity ? errors.stockQuantity[0] : null}
          errorMsg="This field is required" required="required" />}

        <TextInput type="textarea" name="description" label="Description"
          value={book.description} active={book.id !== ''} onChange={onChange} error={errors.description}
          errorMsg="This field is required" required="required" />

        <div className="row">
          { book.coverPic && <div className="col s6 m4">
            <img width="100" src={book.coverPic} />
          </div>}

          <div className="col s6 m6">
            <button onClick={uploadCoverPic} type="button" className="btn">
              { !book.coverPic ? 'Add Cover Pic' : 'Change Cover Pic'}
            </button>
          </div>
        </div>

        <br/><br/>

        <div className="card-action">
          <div className="row valign-wrapper">
            <div className="col s12">
              { book.coverPic && <button className="btn waves-effect waves-light"
                type="submit">Save <i className="material-icons">send</i>
              </button>}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default BookForm;
