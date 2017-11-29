import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

const addCategorySuccess = category => ({
  type: types.ADD_CATEGORY_SUCCESS, category
});

const loadCategoriesSuccess = categories => ({
  type: types.LOAD_CATEGORIES_SUCCESS, categories
});

const updateCategorySuccess = category => ({
  type: types.UPDATE_CATEGORY_SUCCESS, category
});

const deleteCategorySuccess = category => ({
  type: types.DELETE_CATEGORY_SUCCESS, category
});

// load book categories from server
const loadCategories = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/categories', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadCategoriesSuccess(data.categories)))
    .catch(({ response }) => {
      toastr(response.data.error);
    });
};

// save or update book category
const saveOrUpdateCategory = category => (dispatch) => {
  if (category.id) {
    return axios.put(`/categories/${category.id}`,
      category)
      .then(({ data }) => {
        toastr.success(data.message);
        return dispatch(updateCategorySuccess(data.category));
      });
  }

  return axios.post('/categories', category)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(addCategorySuccess(data.category));
    });
};

// delete book
const deleteCategory = category => dispatch =>
  axios.delete(`/categories/${category.id}`)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(loadCategories());
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });


// action entry point for category actions
const categoryActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_CATEGORIES:
      return dispatch(loadCategories(params[0], params[1]));

    case types.SAVE_OR_UPDATE_CATEGORY:
      return dispatch(saveOrUpdateCategory(params[0]));

    case types.DELETE_CATEGORY:
      return dispatch(deleteCategory(params[0]));

    default:
      break;
  }
};

export default categoryActions;
