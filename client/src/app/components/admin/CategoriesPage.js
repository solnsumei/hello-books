import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import { saveCategory } from '../../actions/categoryActions';

/**
 * [className description]
 * @type {String}
 */
class CategoriesPage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      category: Object.assign({}, this.props.category),
      errors: {}
    };

    this.updateCategoryFormState = this.updateCategoryFormState.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
  }

  /**
   * [showAddModal description]
   * @method showAddModal
   * @return {[type]}     [description]
   */
  showAddModal() {
    const newCategory = {
      id: '',
      name: ''
    };

    this.setState({
      category: Object.assign({}, newCategory),
      errors: {}
    });

    $('#category-modal').modal('open');
  }

  /**
   * ]
   * @method onEdit
   * @param  {[type]} category [description]
   * @return {[type]}          [description]
   */
  onEdit(category) {
    this.setState({
      category: Object.assign({}, category),
      errors: {}
    });

    $('#category-modal').modal('open');
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateCategoryFormState(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({ category });
  }

  /**
   * [saveCategory description]
   * @method saveCategory
   * @param  {[type]} event [description]
   * @return {[type]} [description]
   */
  saveCategory(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.addBookCategory(this.state.category)
      .then(() => {
        $('.modal').modal('close');
        toastr.success('Category saved');
        this.setState({ category: { name: '' } });
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
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <p className="card-title teal-text">
                  <b>Book Categories</b>
                  <span className="right">
                    <button onClick={this.showAddModal}
                      className="btn-floating waves-effect waves-green">
                      <i className="material-icons">add</i>
                    </button>
                  </span>
                </p>
                <br/>
                <div className="divider"></div>
                <CategoryList
                  categories={this.props.categories}
                  onEdit={this.onEdit}
                  onDelete={this.onDelete}
                />
              </div>
            </div>
          </div>
        </div>
        <CategoryModal
          category={this.state.category}
          errors={this.state.errors}
          onSubmit={this.saveCategory}
          onChange={this.updateCategoryFormState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const category = {
    id: '',
    name: '' };

  return ({
    category,
    categories: state.categories
  });
};

const mapDispatchToProps = dispatch => ({
  addBookCategory: category => dispatch(saveCategory(category))
});

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  category: PropTypes.object,
  addBookCategory: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
