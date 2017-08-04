import db from '../models';
import bcrypt from 'bcryptjs';

export const usersController = {
    create(req, res) {

        req.sanitizeBody('username').trim();
        req.sanitizeBody('password').trim();
        req.sanitizeBody('password').trim();

        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('username', 'Username must be at least 2 chars and less than 30 chars').isLength({min:2, max:30});
        req.checkBody('username', 'Username must be alphanumeric').isAlphanumeric();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password', 'Password must me greater than or equal to 8 chars').isLength({min:8, max:255});

        req.getValidationResult().then(function(result) {
            if(!result.isEmpty()){
                return res.status(400).send(result.array());
            }

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) {
                        return res.status(400).send(err);
                    }

                    return db.User
                        .create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        })
                        .then(user => res.status(201).send(user))
                        .catch(error => {
                            if(error.name == "SequelizeUniqueConstraintError"){
                                res.status(400).send(error.errors);
                            }else{
                                res.status(400).send(error);
                            }
                        });
                })
            });

        });
    },

    index(req, res) {
        return db.User
            .findAll({
                attributes: ['username', 'email']
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    }

};