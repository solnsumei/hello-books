import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import bookActions from '../../src/app/actions/bookActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- bookActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // load books action
  describe('loadBooks', () => {
    it('should create a LOAD_BOOKS_SUCCESS action', (done) => {
      moxios.stubRequest('/books', {
        status: 200,
        response: {
          success: true,
          message: 'Books loaded successfully',
          books: mockItems.books
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_BOOKS_SUCCESS,
          books: mockItems.books
        }
      ];

      store.dispatch(bookActions(types.LOAD_BOOKS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load books request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/books', {
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

      store.dispatch(bookActions(types.LOAD_BOOKS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // get book action
  describe('getBook', () => {
    it('should create a GET_BOOK_SUCCESS action', (done) => {
      moxios.stubRequest('/books/1', {
        status: 200,
        response: {
          success: true,
          book: mockItems.book
        }
      });

      const expectedActions = [
        {
          type: types.GET_BOOK_SUCCESS,
          book: {
            id: 1,
            title: 'Android Book'
          }
        }
      ];

      store.dispatch(bookActions(types.GET_BOOK, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load book request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/books/1', {
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

      store.dispatch(bookActions(types.GET_BOOK, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('addBook', () => {
    it('should create a ADD_BOOK_SUCCESS action', (done) => {
      moxios.stubRequest('/books', {
        status: 201,
        response: {
          success: true,
          book: mockItems.book
        }
      });

      const expectedActions = [
        {
          type: types.ADD_BOOK_SUCCESS,
          book: mockItems.book
        }
      ];

      store.dispatch(bookActions(types.SAVE_OR_UPDATE_BOOK, mockItems.bookWithoutId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('updateBook', () => {
    it('should create a UPDATE_BOOK_SUCCESS action', (done) => {
      moxios.stubRequest('/books/1', {
        status: 201,
        response: {
          success: true,
          book: mockItems.book
        }
      });

      const expectedActions = [
        {
          type: types.UPDATE_BOOK_SUCCESS,
          book: mockItems.book
        }
      ];

      store.dispatch(bookActions(types.SAVE_OR_UPDATE_BOOK, mockItems.book))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('addStockQuantity', () => {
    it('should create a ADD_STOCK_QUANTITY_SUCCESS action', (done) => {
      moxios.stubRequest('/books/1', {
        status: 200,
        response: {
          success: true,
          book: mockItems.book
        }
      });

      const expectedActions = [
        {
          type: types.ADD_STOCK_QUANTITY_SUCCESS,
          book: mockItems.book
        }
      ];

      store.dispatch(bookActions(types.ADD_STOCK_QUANTITY, mockItems.book, 4))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('deleteBookAction', () => {
    it('should create a LOAD_BOOKS action', (done) => {
      moxios.stubRequest('/books/1', {
        status: 200,
        response: {
          success: true,
          message: 'Book was deleted successfully'
        }
      });

      const expectedActions = [
        {
          type: types.DELETE_BOOK_SUCCESS,
          book: mockItems.book
        }
      ];

      store.dispatch(bookActions(types.DELETE_BOOK, mockItems.book))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed delete request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/books/1', {
        status: 400,
        response: {
          success: false,
          error: 'Book was not deleted'
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(bookActions(types.DELETE_BOOK, mockItems.book))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Empty book action', () => {
    it('should create a FAILED_ACTION action', (done) => {
      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(bookActions('AEE'));
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

      store.dispatch(bookActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});
