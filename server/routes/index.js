import express from 'express';
import usersController from '../controllers/users';
import categoriesController from '../controllers/categories';
import booksController from '../controllers/books';
import membershipController from '../controllers/membership';
import passwordController from '../controllers/password';
import checkAuth from '../middlewares/checkAuth';
import validateResetToken from '../middlewares/validateResetToken';
import validateCategory from '../middlewares/validateCategory';
import notificationsController from '../controllers/notifications';
import validateBook from '../middlewares/validateBook';
import borrowAccess from '../middlewares/borrowAccess';
import formValidation from '../middlewares/formValidation';
import requestType from '../helpers/requestTypes';
import failedRoutes from '../middlewares/failedRoutes';
import checkAdmin from '../middlewares/checkAdmin';

const router = express.Router();

router.post('/users/signup', formValidation(requestType.SIGNUP), usersController.create);

router.post('/users/signin', formValidation(requestType.LOGIN), usersController.login);

// reset password routes
router.post('/users/forgot-password', passwordController.forgotPassword);
router.post('/users/reset-password', formValidation(requestType.RESET_PASSWORD), validateResetToken, passwordController.resetPassword);

// Authentication middle to check for logged in user

router.get('/user/profile', checkAuth, usersController.getUser);

router.put('/user/profile', checkAuth,
  formValidation(requestType.UPDATE_PROFILE), usersController.updateProfile);

router.post('/user/change-password', checkAuth,
  formValidation(requestType.CHANGE_PASSWORD), usersController.changePassword);

router.get('/books/:bookId', checkAuth, booksController.getBook);

router.get('/books', checkAuth, booksController.getAllBooks);

router.post('/book/borrow', checkAuth,
  borrowAccess, validateBook, usersController.borrowBook);

router.put('/book/return', checkAuth, validateBook,
  usersController.returnBook);

router.get('/user/history', checkAuth, usersController.borrowHistory);

router.get('/categories', checkAuth, categoriesController.getAllCategories);

router.get('/notifications/:notificationId', checkAuth,
  checkAdmin, notificationsController.getNotification);

router.get('/notifications', checkAuth, checkAdmin,
  notificationsController.getAllUnreadNotifications);

router.get('/membership', checkAuth, checkAdmin,
  membershipController.getAllMemberShipTypes);

router.put('/membership/:membershipId', checkAuth, checkAdmin,
  formValidation(requestType.EDIT_MEMBERSHIP_TYPE), membershipController.update);

router.post('/categories', checkAuth, checkAdmin,
  formValidation(requestType.ADD_CATEGORY), categoriesController.create);

router.put('/categories/:categoryId', checkAuth, checkAdmin,
  formValidation(requestType.EDIT_CATEGORY), validateCategory, categoriesController.update);

router.delete('/categories/:categoryId', checkAuth, checkAdmin,
  validateCategory, categoriesController.delete);

router.post('/books', checkAuth, checkAdmin,
  formValidation(requestType.ADD_BOOK), validateCategory, booksController.create);

router.post('/books/:bookId', checkAuth, checkAdmin,
  formValidation(requestType.ADD_QUANTITY), validateBook, booksController.addQuantity);

router.put('/books/:bookId', checkAuth, checkAdmin,
  formValidation(requestType.EDIT_BOOK), validateCategory, booksController.update);

router.delete('/books/:bookId', checkAuth,
  checkAdmin, validateBook, booksController.delete);

// Middleware for failed routes
router.use(failedRoutes);
/**
 * Route file for api routes
 * @export router
 */
export default router;
