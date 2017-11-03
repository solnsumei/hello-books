import express from 'express';
import usersController from '../controllers/users';
import categoriesController from '../controllers/categories';
import booksController from '../controllers/books';
import membershipController from '../controllers/membership';
import notificationsController from '../controllers/notifications';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import checkLogin from '../middlewares/checkLogin';
import checkSignUp from '../middlewares/checkSignUp';
import createBookRequest from '../middlewares/createBookRequest';
import editBookRequest from '../middlewares/editBookRequest';
import validateUser from '../middlewares/validateUser';
import validateBook from '../middlewares/validateBook';
import checkBook from '../middlewares/checkBook';
import userCanBorrow from '../middlewares/userCanBorrow';
import profileUpdateRequest from '../middlewares/profileUpdateRequest';
import editMembershipTypeRequest from '../middlewares/editMembershipTypeRequest';
import checkMembershipType from '../middlewares/checkMembershipType';
import changePasswordRequest from '../middlewares/changePasswordRequest';
import { categoryRequest, validateCategoryId, validateCategoryIdParam } from '../middlewares/categoryRequest';


const router = express.Router();

router.post('/users/signup', checkSignUp, usersController.create);

router.post('/users/signin', checkLogin, usersController.login);

// Authentication middle to check for logged in user
router.use(authMiddleware);

router.get('/users/:userId', usersController.getUser);

router.put('/users/profile', profileUpdateRequest, checkMembershipType, usersController.updateProfile);

router.post('/users/change-password', changePasswordRequest, usersController.changePassword);

router.get('/membershiptypes', membershipController.getAllMemberShipTypes);

router.get('/books/:bookId', booksController.getBook);

router.get('/books', booksController.getAllBooks);

router.post('/users/:userId/books', validateUser, userCanBorrow, validateBook,
  usersController.borrowBook);

router.put('/users/:userId/books', validateUser, validateBook,
  usersController.returnBook);

router.get('/users/:userId/books', validateUser, usersController.borrowHistory);

// Admin middleware to check if user is an admin
router.use(adminMiddleware);

router.get('/notifications/:notificationId', notificationsController.getNotification);

router.get('/notifications', notificationsController.getAllUnreadNotifications);

router.put('/membershiptypes/:membershipTypeId', editMembershipTypeRequest, membershipController.update);

router.post('/categories', categoryRequest, categoriesController.create);

router.put('/categories/:categoryId', categoryRequest,
  validateCategoryIdParam, categoriesController.update);

router.delete('/categories', validateCategoryId, categoriesController.delete);

router.get('/categories', categoriesController.getAllCategories);

router.post('/books', createBookRequest, validateCategoryId, booksController.create);

router.post('/books/:bookId', checkBook, booksController.addQuantity);

router.put('/books/:bookId', editBookRequest, validateCategoryId, booksController.update);

router.delete('/books', validateBook, booksController.delete);

/**
 * Route file for api routes
 * @export router
 */
export default router;
