import {usersController} from '../controllers/users';
import {booksController} from "../controllers/books";
import {authMiddleware} from "../middlewares/index";

export function routes(app) {

    app.post('/api/users/signup', usersController.create);

    app.post('/api/users/signin', usersController.login);

    // app.get('/api/users', usersController.index);

    app.use(authMiddleware(app));

    app.get('/api/books', booksController.index);

    app.post('/api/books', booksController.create);

}