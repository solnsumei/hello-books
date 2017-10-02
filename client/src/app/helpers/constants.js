import types from '../actions/actionTypes';

const constants = () => ({ headers: { 'x-token': localStorage.getItem(types.USER_TOKEN) } });

const routeTitles = (route) => {
  switch (route) {
    case '/login':
      return 'Login';
    case '/register':
      return 'User Registration';
    case '/profile':
      return 'Profile';
    case '/catalog':
      return 'Catalog';
    case '/book-detail':
      return 'Book Details';
    case '/borrow-history':
      return 'Borrow History';
    default:
      return 'Home';
  }
};

export { constants, routeTitles };
