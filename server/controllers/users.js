import db from '../models';
import app from '../../app';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const usersController = {
    create(req, res) {

        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(400).send({error : 'All fields are required!'});
        }

        return db.User
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            .then(user => res.status(201).send({message: "User created successfully", user:{
                username: user.username,
                email: user.email
            }}))
            .catch(error => {
                if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError"){
                    return res.status(400).send(error.errors);
                }else{
                    res.status(400).send(error);
                }
            });

    },

    // Get all users
    index(req, res) {
        return db.User
            .findAll({
                attributes: ['username', 'email']
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

    // Authenticate users
    login(req, res){
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(400).send({error : 'All fields are required!'});
        }

        req.sanitizeBody('username').trim();
        req.checkBody('username', 'Username is required').notEmpty();

        req.getValidationResult().then((result) => {
            if(!result.isEmpty()){
                return res.status(400).send(result.array());
            }
        });

        return db.User
            .findOne({where : {
                username: req.body.username
            }})
            .then(user => {
                if(!user){
                    return res.status(401).send({ error: 'User not found'});
                }else {
                    if(bcrypt.compareSync(req.body.password, user.password)){

                        const token = jwt.sign({user: user}, app.get('webSecret'), {
                            expiresIn: 60*60*24
                        });

                        return res.status(200).send({
                            message: "You are logged in successfully",
                            username: user.username,
                            token: token
                        });

                    } else {
                        return res.status(401).send({ error: 'Password is incorrect'});
                    }
                }
            }).catch(error => res.status(400).send(error));

    },
};