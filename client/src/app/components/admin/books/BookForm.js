import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';


const BookForm = ({ book, onSubmit, categories, uploadCoverPic, onChange, errors }) => (
  <form onSubmit={onSubmit} className="col s12 m8 offset-m2">
    <div className="card">
      <div className="card-content">
        <p className="card-title">
          <span className="right">
            <Link to="/admin/books" className="btn-floating">
              <i className="material-icons">arrow_back</i>
            </Link>
          </span>
        </p>
        <br />
        <div className="divider"></div>
        <br />

        { Object.keys(errors).length > 0 ?
          <p className="red-text">** There are some errors with your input</p>
          : ''
        }

        <TextInput type="text" name="title" label="Book Title"
          value={book.title}
          onChange={onChange} active={book.id !== ''} error={errors.title}
          errorMsg="This field is required" required="required" />

        <TextInput type="text" name="author" label="Author"
          value={book.author} active={book.id !== ''} onChange={onChange} error={errors.author}
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
          value={book.description} active={book.id !== ''} onChange={onChange} error={errors.description}
          errorMsg="This field is required" required="required" />

        {!book.id && <TextInput type="number" name="stockQuantity" label="Stock Quantity"
          value={book.stockQuantity}
          active={book.id !== ''} onChange={onChange}
          error={errors.stockQuantity}
          errorMsg="This field is required" required="required" />}

        <div className="row">
          { book.coverPic && <div className="col s6 m4">
            <img width="100" src={book.coverPic} />
          </div>}

          <div className="col s6 m8">
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
                type="submit">Save
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
);

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default BookForm;
