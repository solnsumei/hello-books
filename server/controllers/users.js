import db from '../models';

export const usersController = {
    create(req, res) {
        return db.User
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    }
};