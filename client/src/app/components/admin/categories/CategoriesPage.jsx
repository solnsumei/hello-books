import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import queryString from 'query-string';
import Pagination from '../../common/Pagination';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import actionTypes from '../../../actions/actionTypes';
import categoryActions from '../../../actions/categoryActions';
import Modal from '../../common/Modal';

/**
 * Categories component class
 * @type {Object}
 */
export class CategoriesPage extends React.Component {
  /**
   * Category page constructor
   * @method constructor
   * @param  {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      category: { ...this.props.category },
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
   * Load categories when component mounts
   * @method componentDidMount
   * 
   * @return {void}
   */
  componentDidMount() {
    if (parseInt(this.props.queryParams.page, 10)) {
      this.props.loadCategories(this.props.queryParams.page, this.props.perPage);
    } else {
      this.props.loadCategories(null, this.props.perPage);
    }
    $('.modal').modal();
  }

  /**
     * React lifecycle method
     * @param {Object} nextProps 
     * @memberof CategoriesPage
     * 
     * @returns {void}
     */
  componentWillReceiveProps(nextProps) {
    if ((this.props.queryParams.page !== nextProps.queryParams.page) ||
      (this.props.categories.length !== nextProps.categories.length)) {
      this.props.loadCategories(nextProps.queryParams.page, nextProps.perPage);
    }
  }

  /**
   * Show modal to add a category
   * @method showAddModal
   * 
   * @return {void}
   */
  showAddModal() {
    const newCategory = {
      id: '',
      name: ''
    };

    this.setState({
      category: { ...newCategory },
      errors: {}
    });

    $('#category-modal').modal('open');
  }

  /**
   * Show modal to edit a category
   * @method onEdit
   * @param  {Object} category
   * 
   * @return {void}
   */
  onEdit(category) {
    this.setState({
      category: { ...category },
      errors: {}
    });

    $('#category-modal').modal('open');
  }

  /**
   * Delete a category
   * @method onDelete
   * @param  {Object} category
   * 
   * @return {void}
   */
  onDelete(category) {
    this.setState({
      category: { ...category },
      errors: {}
    });

    $('#modal1').modal('open');
  }

  /**
   * show delete modal
   * @method showReturnModal
   * 
   * @return {void}
   */
  confirmDelete() {
    $('.modal').modal('close');

    this.props.deleteCategory(this.state.category);

    this.setState({
      category: {
        id: '',
        name: '' }
    });
  }

  /**
   * Updates the category form state
   * @param {object} event
   * 
   * @returns {object} state
   */
  updateCategoryFormState(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({ category });
  }

  /**
   * Save category to state
   * @method saveCategory
   * @param  {Object} event
   * 
   * @return {function} setState
   */
  saveCategory(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.saveOrUpdateCategory(this.state.category)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ category: { name: '' } });
      })
      .catch(({ response }) => this.setState({ errors: response.data.errors }));
  }

  /**
   * Renders the jsx page
   * @method render
   * 
   * @return {Object} jsx
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
                className="btn-floating waves-effect waves-green bg-primary btn-large">
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
        </div>

        {(this.props.itemCount > this.props.perPage) &&
          <Pagination
            itemCount={this.props.itemCount}
            perPage={this.props.perPage}
            pageNumber={this.props.queryParams.page}
            pageUrl={this.props.location.pathname}
          />
        }

        <CategoryModal
          category={this.state.category}
          errors={this.state.errors}
          onSubmit={this.saveCategory}
          onChange={this.updateCategoryFormState}
        />

        {this.props.categories && <Modal id="modal1"
          title="Confirm Delete"
          text={`Do you want to delete category with name ${this.state.category.name}`}
          action={this.confirmDelete}
        />}
      </div>
    );
  }
}

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => {
  const category = {
    id: '',
    name: '' };

  const queryParams = queryString.parse(ownProps.location.search);

  return {
    perPage: 3,
    itemCount: state.itemCount.categories,
    queryParams,
    category,
    categories: state.categories.sort((a, b) => (a.id - b.id))
  };
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  loadCategories: (page, limit) =>
    dispatch(categoryActions(actionTypes.LOAD_CATEGORIES, page, limit)),
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
