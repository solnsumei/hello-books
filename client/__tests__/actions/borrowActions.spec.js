import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import borrowActions from '../../src/app/actions/borrowActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- borrowActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // load borrowBooks action
  describe('loadBorrowedBooks', () => {
    it('should create a LOAD_BORROWED_BOOKS_SUCCESS action', (done) => {
      moxios.stubRequest('/user/history', {
        status: 200,
        response: {
          success: true,
          message: 'borrowBooks loaded successfully',
          borrowedBooks: mockItems.borrowedBooks
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_BORROWED_BOOKS_SUCCESS,
          borrowedBooks: mockItems.borrowedBooks
        }
      ];

      store.dispatch(borrowActions(types.LOAD_BORROWED_BOOKS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load borrowBooks request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/user/history', {
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

      store.dispatch(borrowActions(types.LOAD_BORROWED_BOOKS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // load borrowBooks not returned action
  describe('loadBorrowedBooks Not Returned', () => {
    it('should create a LOAD_BORROWED_BOOKS_SUCCESS action', (done) => {
      moxios.stubRequest('/user/history?returned=false', {
        status: 200,
        response: {
          success: true,
          message: 'borrowBooks loaded successfully',
          borrowedBooks: mockItems.borrowedBooks
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_BORROWED_BOOKS_SUCCESS,
          borrowedBooks: mockItems.borrowedBooks
        }
      ];

      store.dispatch(borrowActions(types.LOAD_BOOKS_NOT_RETURNED, false))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load borrowBooks not returned request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/user/history?returned=false', {
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

      store.dispatch(borrowActions(types.LOAD_BOOKS_NOT_RETURNED, false))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // borrow book action
  describe('Borrow book', () => {
    it('should create a BORROW_BOOK_SUCCESS action', (done) => {
      moxios.stubRequest('/book/borrow', {
        status: 200,
        response: {
          success: true,
          borrowedBook: mockItems.borrowedBook
        }
      });

      const expectedActions = [
        {
          type: types.BORROW_BOOK_SUCCESS,
          borrowedBook: mockItems.borrowedBook
        }
      ];

      store.dispatch(borrowActions(types.BORROW_BOOK, mockItems.borrowedBook.bookId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed borrow book request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/book/borrow', {
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

      store.dispatch(borrowActions(types.BORROW_BOOK, mockItems.borrowedBook.bookId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // return book action
  describe('Return book', () => {
    it('should create a RETURN_BOOK_SUCCESS action', (done) => {
      moxios.stubRequest('/book/return', {
        status: 200,
        response: {
          success: true,
          returnedBook: mockItems.borrowedBook
        }
      });

      const expectedActions = [
        {
          type: types.RETURN_BOOK_SUCCESS,
          returnedBook: mockItems.borrowedBook
        }
      ];

      store.dispatch(borrowActions(types.RETURN_BOOK, mockItems.borrowedBook.bookId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    it('should create a LOAD_BORROWED_BOOKS_SUCCESS action', (done) => {
      moxios.stubRequest('/book/return', {
        status: 200,
        response: {
          success: true,
          returnedBook: mockItems.borrowedBook
        }
      });

      moxios.stubRequest('/user/history?returned=false', {
        status: 200,
        response: {
          success: true,
          message: 'borrowBooks loaded successfully',
          borrowedBooks: mockItems.borrowedBooks
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_BORROWED_BOOKS_SUCCESS,
          borrowedBooks: mockItems.borrowedBooks
        }
      ];

      store.dispatch(borrowActions(types.RETURN_BOOK, mockItems.borrowedBook.bookId, 'false'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed borrow book request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/book/return', {
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

      store.dispatch(borrowActions(types.RETURN_BOOK, mockItems.borrowedBook.bookId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Empty borrowBook action', () => {
    it('should create a FAILED_ACTION action', (done) => {
      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(borrowActions('AEE'));
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

      store.dispatch(borrowActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});
