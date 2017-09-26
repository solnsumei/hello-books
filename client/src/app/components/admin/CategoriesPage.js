import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import { addCategory } from '../../actions/categoryActions';

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
    this.props.addBookCategory(this.state.category)
      .then(() => {
        $('.modal').modal('close');
        toastr.success('category added successfully');
        this.setState({ category: { name: '' } });
      })
      .catch(({ response }) => {
        if (response.data.error) {
          this.setState({ errors: response.data.error });
          console.log(this.state.errors);
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
                    <button className="btn-floating waves-effect waves-green modal-trigger"
                      data-target="category-modal">
                      <i className="material-icons">add</i>
                    </button>
                  </span>
                </p>
                <br/>
                <div className="divider"></div>
                <CategoryList {...this.props} />
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
  const category = { name: '' };
  return ({
    category,
    categories: state.categories
  });
};

const mapDispatchToProps = dispatch => ({
  addBookCategory: category => dispatch(addCategory(category))
});

CategoriesPage.propTypes = {
  categories: PropTypes.array,
  category: PropTypes.object,
  addBookCategory: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
