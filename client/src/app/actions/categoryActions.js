import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

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
const loadCategories = headers => dispatch =>
  axios.get('/api/v1/categories', headers)
    .then(({ data }) => dispatch(loadCategoriesSuccess(data)))
    .catch((error) => {
      throw (error);
    });

// save or update book category
const saveOrUpdateCategory = (category, headers) => (dispatch) => {
  if (category.id) {
    return axios.put(`/api/v1/categories/${category.id}`,
      category, headers)
      .then(({ data }) => dispatch(updateCategorySuccess(data.category)));
  }

  return axios.post('/api/v1/categories', category, headers)
    .then(({ data }) => dispatch(addCategorySuccess(data.category)));
};

// delete book
const deleteCategory = category => dispatch =>
  axios({
    method: 'delete',
    url: '/api/v1/categories',
    data: { categoryId: category.id },
    headers: { 'x-token': localStorage.getItem(types.USER_TOKEN) },
  })
    .then(({ data }) => {
      toastr.success('Category was deleted successfully');
      return dispatch(deleteCategorySuccess(category));
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });


// action entry point for category actions
const chooseCategoryAction = (action, category = null) => (dispatch) => {
  const headers = authCheck(dispatch);

  switch (action) {
    case types.LOAD_CATEGORIES:
      return dispatch(loadCategories(headers));

    case types.SAVE_OR_UPDATE_CATEGORY:
      return dispatch(saveOrUpdateCategory(category, headers));

    case types.DELETE_CATEGORY:
      return dispatch(deleteCategory(category, headers));

    default:
      break;
  }
};

export default chooseCategoryAction;
