import {usersController} from '../controllers/users';

export function routes(app) {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to Hello-Books API'
    }));

    app.post('/api/users', usersController.create);
}