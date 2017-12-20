
import types from '../../src/app/actions/actionTypes';

export default {
  book: {
    id: 1,
    title: 'Android Book'
  },

  bookWithoutId: {
    title: 'Android Book'
  },

  books: {
    count: 3,
    rows: [
      {}
    ]
  },
  category: {
    id: 1,
    name: 'Android'
  },

  categoryWithoutId: {
    name: 'Android'
  },

  categories: {
    count: 3,
    rows: [
      {}
    ]
  },
  // Membership types mock   
  membership: {
    id: 1,
    name: 'GOLD',
    lendDuration: 6
  },

  memberships: {
    count: 2,
    rows: [
      {}
    ]
  },
  // notification mock
  notification: {
    id: 1,
  },

  notifications: {
    count: 2,
    rows: [
      {}
    ]
  },
  // borrowed mock   
  borrowedBook: {
    bookId: 1,
    borrowed: true
  },

  returnedBook: {
    bookId: 1,
    borrowed: false
  },

  borrowedBooks: {
    count: 2,
    rows: [
      {}
    ]
  },

  // user
  user: {
    id: 1,
    username: 'solking',
    email: 'sol@gmail.com',
  },
  auth: {
    admin: false,
    id: 1,
  }
};
