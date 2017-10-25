import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import actionTypes from '../../../actions/actionTypes';
import categoryActions from '../../../actions/categoryActions';
import Modal from '../../common/Modal';

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
    this.onDelete = this.onDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
  }

  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    this.props.loadCategories();
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
   * ]
   * @method onDelete
   * @param  {[type]} category [description]
   * @return {[type]}          [description]
   */
  onDelete(category) {
    this.setState({
      category: Object.assign({}, category),
      errors: {}
    });

    $('#modal1').modal('open');
  }

  /**
   * [showDeleteModal description]
   * @method showReturnModal
   * @param  {[type]}        borrowedBook [description]
   * @return {[type]}                     [description]
   */
  confirmDelete() {
    $('.modal').modal('close');

    this.props.deleteCategory(this.state.category)
      .catch(({ response }) => toastr.error(response.data.error));

    this.setState({
      category: {
        id: '',
        name: '' }
    });
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
    this.props.saveOrUpdateCategory(this.state.category)
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
                <CategoryList
                  categories={this.props.categories}
                  onEdit={this.onEdit}
                  onDelete={this.onDelete}
                />
              </div>
            </div>

            <div className="fixed-action-btn">
              <button onClick={this.showAddModal} title="add new"
                className="btn-floating waves-effect waves-green
                 bg-primary btn-large">
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
        </div>

        <CategoryModal
          category={this.state.category}
          errors={this.state.errors}
          onSubmit={this.saveCategory}
          onChange={this.updateCategoryFormState}
        />
        <Modal id="modal1"
          title="Confirm Delete"
          text={`Do you want to delete category with name ${this.state.category.name}`}
          action={this.confirmDelete}
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
    categories: state.categories.sort((a, b) => (a.id - b.id))
  });
};

const mapDispatchToProps = dispatch => ({
  loadCategories: () =>
    dispatch(categoryActions(actionTypes.LOAD_CATEGORIES)),
  saveOrUpdateCategory: category =>
    dispatch(categoryActions(actionTypes.SAVE_OR_UPDATE_CATEGORY, category)),
  deleteCategory: category =>
    dispatch(categoryActions(actionTypes.DELETE_CATEGORY, category))
});

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  category: PropTypes.object,
  saveOrUpdateCategory: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);