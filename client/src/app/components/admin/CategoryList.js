import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ categories, onEdit, onClickAddNew }) => (
  <div className="col s12 m5">
    <div className="card">
      <div className="card-content">
        <span className="card-title  teal-text"><b>Book Categories</b></span>
        <div className="divider"></div>
        <table className="responsive-table striped bordered">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fiction</td>
              <td>fiction</td>
              <td>
                <a title="edit" className="btn-floating orange">
                  <i className="material-icons">edit</i>
                </a>&nbsp;
                <a title="delete" className="btn-floating red">
                  <i className="material-icons">delete</i>
                </a>
              </td>
            </tr>
            <tr>
              <td>Software Development</td>
              <td>software-development</td>
              <td>
                <a title="edit" className="btn-floating orange">
                  <i className="material-icons">edit</i>
                </a>&nbsp;
                <a title="delete" className="btn-floating red">
                  <i className="material-icons">delete</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-action">
        <a href="#">Add New</a>
      </div>
    </div>
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.array,
  onEdit: PropTypes.func,
  onClickAddNew: PropTypes.func
};

export default CategoryList;
