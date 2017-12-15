import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

/**
 * Triggers the category reducer to add category to state
 * @param {Object} category
 * 
 * @returns {Object} with a type as string and a category object
 */
export const addCategorySuccess = category => ({
  type: types.ADD_CATEGORY_SUCCESS, category
});

/**
 * Triggers the category reducer to update category array in state
 * @param {Object} categories
 * 
 * @returns {Object} with a type as string and a categories array
 */
export const loadCategoriesSuccess = categories => ({
  type: types.LOAD_CATEGORIES_SUCCESS, categories
});

/**
 * Triggers the category reducer to update category in state
 * @param {Object} category
 * 
 * @returns {Object} with a type as string and a category object
 */
export const updateCategorySuccess = category => ({
  type: types.UPDATE_CATEGORY_SUCCESS, category
});

/**
 * Triggers the category reducer to delete category in state
 * @param {Object} category
 * 
 * @returns {Object} with a type as string and a category object
 */
export const deleteCategorySuccess = category => ({
  type: types.DELETE_CATEGORY_SUCCESS, category
});

/**
 * Error action type to call when action fails
 * @param {void} null
 * 
 * @returns {string} type
 */
const actionError = () => ({
  type: types.FAILED_ACTION
});

/**
 * Fetches all categories from the api endpoint
 * @param {string} page
 * @param {integer} limit
 * 
 * @returns {function} dispatch
 */
const loadCategories = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/categories', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadCategoriesSuccess(data.categories)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });
};

/**
 * Creates or updates a category
 * @param {Object} category
 * 
 * @returns {function} dispatch
 */
const saveOrUpdateCategory = category => (dispatch) => {
  if (category.id) {
    // updates category
    return axios.put(`/categories/${category.id}`,
      category)
      .then(({ data }) => {
        toastr.success(data.message);
        return dispatch(updateCategorySuccess(data.category));
      });
  }

  // create a category call
  return axios.post('/categories', category)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(addCategorySuccess(data.category));
    });
};

/**
 * Delete a category
 * @param {Object} category - book to add quantity to
 * 
 * @returns {function} dispatch
 */
const deleteCategory = category => dispatch =>
  axios.delete(`/categories/${category.id}`)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(deleteCategorySuccess(category));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });


/**
 * Entry point for all category actions
 * @param {string} action - action to perform
 * @param {array} params - extra params that are optional
 * 
 * @returns {function} dispatch
 */
const categoryActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return dispatch(actionError());

  switch (action) {
    case types.LOAD_CATEGORIES:
      return dispatch(loadCategories(params[0], params[1]));

    case types.SAVE_OR_UPDATE_CATEGORY:
      return dispatch(saveOrUpdateCategory(params[0]));

    case types.DELETE_CATEGORY:
      return dispatch(deleteCategory(params[0]));

    default:
      return dispatch(actionError());
  }
};

export default categoryActions;
