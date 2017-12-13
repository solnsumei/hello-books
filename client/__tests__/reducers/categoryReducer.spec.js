import expect from 'expect';
import reducer from '../../src/app/reducers/categoryReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import { loadCategorySuccess, addCategorySuccess, updateCategorySuccess,
  deleteCategorySuccess,
  loadCategoriesSuccess } from '../../src/app/actions/categoryActions';

let initialState = [];
let newState;

describe('Category reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_CATEGORIES_SUCCESS', () => {
    newState = reducer(initialState, loadCategoriesSuccess(mockItems.categories));
    expect(newState).toEqual(mockItems.categories.rows);
  });

  it('should handle ADD_CATEGORY_SUCCESS', () => {
    newState = reducer(initialState, addCategorySuccess(mockItems.category));
    expect(newState).toEqual([mockItems.category]);
  });

  it('should handle UPDATE_CATEGORY_SUCCESS', () => {
    initialState = [{ id: 1, name: 'Fake Category' }];
    newState = reducer(initialState, updateCategorySuccess(mockItems.category));
    expect(newState).toEqual([mockItems.category]);
  });

  it('should handle DELETE_BOOK_SUCCESS', () => {
    initialState = [mockItems.category];
    newState = reducer(initialState, deleteCategorySuccess(mockItems.category));
    expect(newState).toEqual([]);
  });
});
