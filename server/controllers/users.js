import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';
import app from '../../app';

export default {

  // Create a user account in database
  create(req, res) {
    return db.User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send({ message: 'User created successfully',
        user: {
          username: user.username,
          email: user.email
        } }))
      .catch(error => res.status(400).send(error.errors));
  },

  // Get all users
  index(req, res) {
    return db.User
      .findAll({
        attributes: ['username', 'email', 'admin']
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  // Authenticate users
  login(req, res) {
    req.sanitizeBody('username').trim();
    req.checkBody('username', 'Username is required').notEmpty();

    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(result.array());
      }
    });

    return db.User
      .findOne({ where: {
        username: req.body.username
      } })
      .then(user => {
        if (!user) {
          return res.status(401).send({ error: 'User not found' });
        }
        else if(bcrypt.compareSync(req.body.password, user.password)){
          // Create token
          const token = jwt.sign({user}, app.get('webSecret'), {
            expiresIn: 60 * 60 * 24
          });

          // Return logged in user
          return res.status(200).send({
            message: "You are logged in successfully",
            username: user.username,
            token: token
          });
        } else {
          return res.status(401).send({ error: 'Password is incorrect'});
        }
      }).catch(error => res.status(400).send(error));
  },

  // Borrow book
  borrowBook(req, res) {
    if (req.body.bookId === null || !Number.isInteger(Number.parseInt(req.body.bookId))) {
      return res.status(400).send({ error: 'Valid book Id is required' });
    }

    return db.Book.findById(req.body.bookId)
      .then((foundBook) => {
        if (!foundBook) {
          return res.status(404).send({ error: 'Book not found' });
        }

        if (foundBook.quantity === 0) {
          return res.status(200).send({ message: 'No copies available for borrowing' });
        }

        return db.UserBook.findOne({
          where: {
            bookId: foundBook.id,
            userId: req.auth.user.id,
            returned: false
          },
        })
          .then((userbook) => {
            if (userbook) {
              return res.status(200).send({ message: 'You already borrowed this book' });
            }

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14);

            return db.UserBook
              .create({
                userId: req.auth.user.id,
                bookId: foundBook.id,
                dueDate,
              })
              .then((borrowedBook) => {
                foundBook.update({
                  quantity: (foundBook.quantity - 1),
                  isBorrowed: true,
                }).then((result) => {
                  if (result) {
                    return res.status(200).send(borrowedBook);
                  }
                }).catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error.errors));
          });
      });
  },

  // Borrow History method with returned query string
  borrowHistory(req, res){
    const query = {  userId : req.auth.user.id  };
    if (req.query.returned  === 'true')
      query.returned = true;
    else if (req.query.returned  === 'false')
      query.returned = false;

    console.log(query);
    return db.UserBook
      .findAll({
        include: [{
          model: db.Book,
          attributes: ['title', 'author'],
        }],
        where: query
      }).then(borrowedBooks => res.status(200).send(borrowedBooks));
  }
};
