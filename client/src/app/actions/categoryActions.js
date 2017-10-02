import axios from 'axios';
import types from './actionTypes';
import { constants } from '../helpers/constants';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';

// axios.defaults.headers.post['Content-Type'] = 'application/json';

const addCategorySuccess = category => ({
  type: types.ADD_CATEGORY_SUCCESS, category
});

const loadCategoriesSuccess = categories => ({
  type: types.LOAD_CATEGORIES_SUCCESS, categories
});

const updateCategorySuccess = category => ({
  type: types.UPDATE_CATEGORY_SUCCESS, category
});

const loadCategories = () => dispatch =>
  axios.get('/api/v1/categories', constants())
    .then(({ data }) => dispatch(loadCategoriesSuccess(data)))
    .catch((error) => {
      throw (error);
    });


const saveCategory = category => (dispatch) => {
  if (category.id) {
    return axios.put(`/api/v1/categories/${category.id}`,
      category, constants())
      .then(({ data }) => dispatch(updateCategorySuccess(data.category)));
  }

  return axios.post('/api/v1/categories', category, constants())
    .then(({ data }) => dispatch(addCategorySuccess(data.category)));
};

export { loadCategories, loadCategoriesSuccess, saveCategory };
