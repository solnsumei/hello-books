import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Link } from 'react-router-dom';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';


const BookForm = ({ book, onSubmit, categories, onChange, errors }) => (
  <form onSubmit={onSubmit} className="col s12 l6 offset-l3">
    <div className="card">
      <div className="card-content">
        <span className="card-title">
          Add Book
        </span>
        <div className="divider"></div>
        <br />

        { Object.keys(errors).length > 0 ?
          <p className="red-text">** There are some errors with your input</p>
          : ''
        }

        <TextInput type="text" name="title" label="Book Title"
          value={book.title} onChange={onChange} error={errors.title}
          errorMsg="This field is required" required="required" />

        <TextInput type="text" name="author" label="Author"
          value={book.author} onChange={onChange} error={errors.author}
          errorMsg="This field is required" required="required" />

        <SelectInput
          name="categoryId"
          label="Category"
          value={book.categoryId}
          defaultOption="Select Book Category"
          options={categories}
          onChange={onChange}
          error={errors.categoryId} />

        <br/>
        <TextInput type="textarea" name="description" label="Description"
          value={book.description} onChange={onChange} error={errors.description}
          errorMsg="This field is required" required="required" />

        <TextInput type="number" name="stockQuantity" label="Stock Quantity"
          value={book.stockQuantity} onChange={onChange} error={errors.stockQuantity}
          errorMsg="This field is required" required="required" />

      </div>
      <div className="card-action">
        <div className="row valign-wrapper">
          <div className="col s12">
            <button className="btn waves-effect waves-light"
              type="submit">Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
);

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default BookForm;
