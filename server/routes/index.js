import {usersController} from '../controllers/users';
import {booksController} from "../controllers/books";
import {authMiddleware} from "../middlewares/auth";
import {adminMiddleware} from "../middlewares/admin";

export function routes(app) {

    app.post('/api/users/signup', usersController.create);

    app.post('/api/users/signin', usersController.login);

    app.use(authMiddleware(app));

    app.get('/api/books', booksController.index);

    app.post('/api/users/:userId/books', usersController.borrowBook);

    app.use(adminMiddleware);

    app.get('/api/users', usersController.index);

    app.post('/api/books', booksController.create);

    app.put('/api/books/:bookId', booksController.update);

}