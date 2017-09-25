import express from 'express';
import usersController from '../controllers/users';
import categoriesController from '../controllers/categories';
import booksController from '../controllers/books';
import membershipController from '../controllers/membershiptypes';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import checkLogin from '../middlewares/checklogin';
import checkSignUp from '../middlewares/checksignup';
import createBookRequest from '../middlewares/createbookrequest';
import editBookRequest from '../middlewares/editbookrequest';
import validateUser from '../middlewares/validateuser';
import validateBook from '../middlewares/validatebook';
import checkBook from '../middlewares/checkbook';
import userCanBorrow from '../middlewares/usercanborrow';
import profileUpdateRequest from '../middlewares/profileupdaterequest';
import editMembershipTypeRequest from '../middlewares/editmembershiptyperequest';
import checkMembershipType from '../middlewares/checkmembershiptype';
import { categoryRequest, validateCategoryId, validateCategoryIdParam } from '../middlewares/categoryrequest';


const router = express.Router();

router.post('/users/signup', checkSignUp, usersController.create);

router.post('/users/signin', checkLogin, usersController.login);

// Authentication middle to check for logged in user
router.use(authMiddleware);

router.put('/users/profile', profileUpdateRequest, checkMembershipType, usersController.updateProfile);

router.get('/membershiptypes', membershipController.getAllMemberShipTypes);

router.get('/books', booksController.getAllBooks);

router.post('/users/:userId/books', validateUser, userCanBorrow, validateBook,
  usersController.borrowBook);

router.put('/users/:userId/books', validateUser, validateBook,
  usersController.returnBook);

router.get('/users/:userId/books', validateUser, usersController.borrowHistory);

// Admin middleware to check if user is an admin
router.use(adminMiddleware);

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

router.get('/users', usersController.getAllUsers);

/**
 * Route file for api routes
 * @export router
 */
export default router;
