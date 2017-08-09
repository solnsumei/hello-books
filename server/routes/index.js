import usersController from '../controllers/users';
import booksController from '../controllers/books';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import checkRequestMiddleware from '../middlewares/request-body';
import userCheck from '../middlewares/user-check';
import checkBookAvailability from "../middlewares/check-book-availability";

/**
 * Route file for api routes
 * @param app
 */
export default function routes(app) {
  app.post('/api/users/signup', checkRequestMiddleware, usersController.create);

  app.post('/api/users/signin', checkRequestMiddleware, usersController.login);

  // Authentication middle to check for logged in user
  app.use(authMiddleware(app));

  app.get('/api/books', booksController.index);

  app.post('/api/users/:userId/books', checkRequestMiddleware, userCheck,
    checkBookAvailability, usersController.borrowBook);

  app.put('/api/users/:userId/books', checkRequestMiddleware, userCheck,
    checkBookAvailability, usersController.returnBook);

  app.get('/api/users/:userId/books', userCheck, usersController.borrowHistory);

  // Admin middleware to check if user is an admin
  app.use(adminMiddleware);

  app.post('/api/books', checkRequestMiddleware, booksController.create);

  app.put('/api/books/:bookId', checkRequestMiddleware, booksController.update);

  app.get('/api/users', usersController.index);
}
