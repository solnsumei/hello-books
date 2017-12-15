import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import categoryActions from '../../src/app/actions/categoryActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- categoryActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // load categories action
  describe('loadCategories', () => {
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories', {
        status: 200,
        response: {
          success: true,
          message: 'Categories loaded successfully',
          categories: mockItems.categories
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_CATEGORIES_SUCCESS,
          categories: mockItems.categories
        }
      ];

      store.dispatch(categoryActions(types.LOAD_CATEGORIES))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // Test pagination
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories?limit=2', {
        status: 200,
        response: {
          success: true,
          message: 'Categories loaded successfully',
          categories: mockItems.categories
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_CATEGORIES_SUCCESS,
          categories: mockItems.categories
        }
      ];

      store.dispatch(categoryActions(types.LOAD_CATEGORIES, null, 2))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // Test pagination with all parameters
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories?page=2&limit=5', {
        status: 200,
        response: {
          success: true,
          message: 'Categories loaded successfully',
          categories: mockItems.categories
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_CATEGORIES_SUCCESS,
          categories: mockItems.categories
        }
      ];

      store.dispatch(categoryActions(types.LOAD_CATEGORIES, 2, 5))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load categories request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/categories', {
        status: 400,
        response: {
          success: false,
          error: 'There was an error'
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(categoryActions(types.LOAD_CATEGORIES))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // // get category action
  // describe('getBook', () => {
  //   it('should create a GET_BOOK_SUCCESS action', (done) => {
  //     moxios.stubRequest('/categories/1', {
  //       status: 200,
  //       response: {
  //         success: true,
  //         category: mockItems.category
  //       }
  //     });

  //     const expectedActions = [
  //       {
  //         type: types.GET_BOOK_SUCCESS,
  //         category: {
  //           id: 1,
  //           title: 'Android category'
  //         }
  //       }
  //     ];

  //     store.dispatch(categoryActions(types.GET_BOOK, 1))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions).toEqual(expectedActions);
  //         done();
  //       });
  //   });

  //   // failed load category request
  //   it('should create a FAILED_ACTION action', (done) => {
  //     moxios.stubRequest('/categories/1', {
  //       status: 400,
  //       response: {
  //         success: false,
  //         error: 'There was an error'
  //       }
  //     });

  //     const expectedActions = [
  //       {
  //         type: types.FAILED_ACTION
  //       }
  //     ];

  //     store.dispatch(categoryActions(types.GET_BOOK, 1))
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions).toEqual(expectedActions);
  //         done();
  //       });
  //   });
  // });

  describe('addCategory', () => {
    it('should create a ADD_CATEGORY_SUCCESS action', (done) => {
      moxios.stubRequest('/categories', {
        status: 201,
        response: {
          success: true,
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.ADD_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(categoryActions(types.SAVE_OR_UPDATE_CATEGORY, mockItems.categoryWithoutId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('updateCategory', () => {
    it('should create a UPDATE_CATEGORY_SUCCESS action', (done) => {
      moxios.stubRequest('/categories/1', {
        status: 200,
        response: {
          success: true,
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.UPDATE_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(categoryActions(types.SAVE_OR_UPDATE_CATEGORY, mockItems.category))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('deleteCategoryAction', () => {
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories/1', {
        status: 200,
        response: {
          success: true,
          message: 'category was deleted successfully',
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.DELETE_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(categoryActions(types.DELETE_CATEGORY, mockItems.category))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed delete request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/categories/1', {
        status: 400,
        response: {
          success: false,
          error: 'category was not deleted'
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(categoryActions(types.DELETE_CATEGORY, mockItems.category))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Empty category action', () => {
    it('should create a FAILED_ACTION action', (done) => {
      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(categoryActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('Failed Authentication', () => {
    it('should create a FAILED_ACTION action', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.SIGN_OUT_USER
        },
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(categoryActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});
