import express from 'express';
import usersController from '../controllers/users';
import categoriesController from '../controllers/categories';
import booksController from '../controllers/books';
import membershipController from '../controllers/membership';
import passwordController from '../controllers/password';
import authMiddleware from '../middlewares/auth';
import validateResetToken from '../middlewares/validateResetToken';
import validateCategory from '../middlewares/validateCategory';
import notificationsController from '../controllers/notifications';
import validateBook from '../middlewares/validateBook';
import borrowAccess from '../middlewares/borrowAccess';
import formValidation from '../middlewares/formValidation';
import requestType from '../helpers/requestTypes';
import failedRoutes from '../middlewares/failedRoutes';
import adminMiddleware from '../middlewares/admin';

const router = express.Router();

router.post('/users/signup', formValidation(requestType.SIGNUP), usersController.create);

router.post('/users/signin', formValidation(requestType.LOGIN), usersController.login);

// reset password routes
router.post('/users/forgot-password', passwordController.forgotPassword);
router.post('/users/reset-password', formValidation(requestType.RESET_PASSWORD), validateResetToken, passwordController.resetPassword);

// Authentication middle to check for logged in user

router.get('/user/profile', authMiddleware, usersController.getUser);

router.put('/user/profile', authMiddleware,
  formValidation(requestType.UPDATE_PROFILE), usersController.updateProfile);

router.post('/user/change-password', authMiddleware,
  formValidation(requestType.CHANGE_PASSWORD), usersController.changePassword);

router.get('/books/:bookId', authMiddleware, booksController.getBook);

router.get('/books', authMiddleware, booksController.getAllBooks);

router.post('/book/borrow', authMiddleware,
  borrowAccess, validateBook, usersController.borrowBook);

router.put('/book/return', authMiddleware, validateBook,
  usersController.returnBook);

router.get('/user/history', authMiddleware, usersController.borrowHistory);

router.get('/categories', authMiddleware, categoriesController.getAllCategories);

router.get('/notifications/:notificationId', authMiddleware,
  adminMiddleware, notificationsController.getNotification);

router.get('/notifications', authMiddleware, adminMiddleware,
  notificationsController.getAllUnreadNotifications);

router.get('/membership', authMiddleware, adminMiddleware,
  membershipController.getAllMemberShipTypes);

router.put('/membership/:membershipId', authMiddleware, adminMiddleware,
  formValidation(requestType.EDIT_MEMBERSHIP_TYPE), membershipController.update);

router.post('/categories', authMiddleware, adminMiddleware,
  formValidation(requestType.ADD_CATEGORY), categoriesController.create);

router.put('/categories/:categoryId', authMiddleware, adminMiddleware,
  formValidation(requestType.EDIT_CATEGORY), validateCategory, categoriesController.update);

router.delete('/categories/:categoryId', authMiddleware, adminMiddleware,
  validateCategory, categoriesController.delete);

router.post('/books', authMiddleware, adminMiddleware,
  formValidation(requestType.ADD_BOOK), validateCategory, booksController.create);

router.post('/books/:bookId', authMiddleware, adminMiddleware,
  formValidation(requestType.ADD_QUANTITY), validateBook, booksController.addQuantity);

router.put('/books/:bookId', authMiddleware, adminMiddleware,
  formValidation(requestType.EDIT_BOOK), validateCategory, booksController.update);

router.delete('/books/:bookId', authMiddleware,
  adminMiddleware, validateBook, booksController.delete);

// Middleware for failed routes
router.use(failedRoutes);
/**
 * Route file for api routes
 * @export router
 */
export default router;
