import types from '../actions/actionTypes';

/**
   * Determine title to show on page
   * @param {string} route - location
   * 
   * @return {string} title
   */
const routeTitle = (route) => {
  switch (route) {
    case '/forgot-password':
      return 'Forgot Password';
    case '/reset-password':
      return 'Reset Password';
    case '/reset-success':
      return 'Reset Success';
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

export default routeTitle;
