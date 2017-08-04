import {usersController} from '../controllers/users';
import {booksController} from "../controllers/books";

export function routes(app) {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to Hello-Books API'
    }));

    app.post('/api/users/signup', usersController.create);

    app.get('/api/books', booksController.index);

    app.post('/api/books', booksController.create);
}