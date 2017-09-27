import axios from 'axios';
import types from './actionTypes';

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

const loadCategories = () => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);

  return axios.get('/api/v1/categories', { headers: { 'x-token': token } })
    .then(({ data }) => dispatch(loadCategoriesSuccess(data)))
    .catch((error) => {
      throw (error);
    });
};

const saveCategory = category => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);

  if (category.id) {
    return axios.put(`/api/v1/categories/${category.id}`,
      category, { headers: { 'x-token': token } })
      .then(({ data }) => dispatch(updateCategorySuccess(data.category)));
  }

  return axios.post('/api/v1/categories', category, { headers: { 'x-token': token } })
    .then(({ data }) => dispatch(addCategorySuccess(data.category)));
};

export { loadCategories, loadCategoriesSuccess, saveCategory };
