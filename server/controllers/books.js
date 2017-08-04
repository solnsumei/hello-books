import db from '../models';
import bcrypt from 'bcryptjs';

export const booksController = {

    // Method to add book
    add(req, res) {
        return db.User
            .create({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                pic: req.body.pic,
                quantity: req.body.quantity,
            })
            .then(book => res.status(201).send(book))
            .catch(error => {
                if(error.name == "SequelizeUniqueConstraintError"){
                    res.status(400).send(error.errors);
                }else{
                    res.status(400).send(error);
                }
            });
    },


    // Method to get books from library
    index(req, res) {
        return db.Book
            .findAll({
                attributes: ['id', 'title', 'author', 'description', 'pic', 'quantity']
            })
            .then(books => res.status(200).send(books))
            .catch(error => res.status(400).send(error));
    }

};