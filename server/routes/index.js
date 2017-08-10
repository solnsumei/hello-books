import express from 'express';
import usersController from '../controllers/users';
import booksController from '../controllers/books';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import checkRequestMiddleware from '../middlewares/request-body';
import userCheck from '../middlewares/user-check';
import checkBookAvailability from '../middlewares/check-book-availability';

const router = express.Router();

router.post('/users/signup', checkRequestMiddleware, usersController.create);

router.post('/users/signin', checkRequestMiddleware, usersController.login);

// Authentication middle to check for logged in user
router.use(authMiddleware);

router.get('/books', booksController.index);

router.post('/users/:userId/books', checkRequestMiddleware, userCheck,
  checkBookAvailability, usersController.borrowBook);

router.put('/users/:userId/books', checkRequestMiddleware, userCheck,
  checkBookAvailability, usersController.returnBook);

router.get('/users/:userId/books', userCheck, usersController.borrowHistory);

// Admin middleware to check if user is an admin
router.use(adminMiddleware);

router.post('/books', checkRequestMiddleware, booksController.create);

router.put('/books/:bookId', checkRequestMiddleware, booksController.update);

router.get('/users', usersController.index);

/**
 * Route file for api routes
 * @export router
 */
export default router;

