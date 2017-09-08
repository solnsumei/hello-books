import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';

/**
 * User controller to handle user request
 * @export userController
 */
export default {

  // Create a user account in database
  create(req, res) {
    return db.User
      .create({
        firstName: req.body.firstName,
        surname: req.body.surname,
        username: (req.body.username.toLowerCase()),
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send({ message: 'User created successfully',
        user: {
          surname: `${user.firstName} ${user.surname}`,
          username: user.username,
          email: user.email
        } }))
      .catch((error) => {
        if (error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ errors });
          }
          return res.status(400).send({ errors });
        }

        return res.status(503).send({
          error: 'Request could not be processed, please try again later'
        });
      });
  },

  // Update a user account in database
  updateProfile(req, res) {
    return db.User
      .update({
        firstName: req.body.firstName,
        surname: req.body.surname,
        membershipType: req.body.membershipType
      }, { where: {
        id: req.auth.id
      } })
      .then((result) => {
        if (result) {
          return res.status(200).send({
            success: true,
            message: 'User profile updated successfully',
          });
        }
        return res.status(500).send({ error: 'User profile could not be updated at this time, please try again later' });
      })
      .catch((error) => {
        if (error.name === 'SequelizeValidationError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error: 'Request could not be processed, please try again later'
        });
      });
  },

  // Change password
  changePassword(req, res) {
    return db.User
      .update({
        password: bcrypt.hashSync(req.body.newPassword, 10)
      }, { where: {
        id: req.auth.id
      } })
      .then((result) => {
        if (result) {
          return res.status(200).send({
            success: true,
            message: 'Your Password changed successfully',
          });
        }

        return res.status(500).send({ error: 'Request could not be processed, please try again later' });
      })
      .catch((error) => {
        if (error.name === 'SequelizeValidationError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error: 'Request could not be processed, please try again later'
        });
      });
  },

  // Get all users
  getAllUsers(req, res) {
    return db.User
      .findAll({
        attributes: ['id', 'username', 'email', 'admin']
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send(error));
  },

  // Authenticate users
  login(req, res) {
    return db.User
      .findOne({ where: {
        username: req.body.username
      } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'Username and/or password is incorrect' });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          // Create token
          const token = jwt.sign({ user: {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: user.admin
          } }, process.env.SECRET, {
            expiresIn: 60 * 60 * 2
          });
          // Return logged in user
          return res.status(200).send({
            username: user.username,
            token
          });
        }
        return res.status(401).send({ error: 'Username and/or password is incorrect' });
      }).catch(error => res.status(500).send({
        error: 'Request could not be processed, please try again later'
      }));
  },

  // Authenticate users
  logout(req, res) {

  },

  // Borrow book
  borrowBook(req, res) {
    if (req.book.stockQuantity === req.book.borrowedQuantity) {
      return res.status(404).send({ error: 'No copies available for borrowing' });
    }

    return db.UserBook.findOne({
      where: {
        bookId: req.book.id,
        userId: req.auth.id,
        returned: false
      },
    })
      .then((book) => {
        if (book) {
          return res.status(409).send({ error: 'You already borrowed this book' });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + req.lendDuration);

        return db.UserBook
          .create({
            userId: req.auth.id,
            bookId: req.book.id,
            dueDate,
          })
          .then(borrowedBook =>
            req.book
              .update({
                borrowedQuantity: (req.book.borrowedQuantity + 1),
                isBorrowed: true,
              }).then((result) => {
                if (result) {
                  return res.status(200).send({ message: 'Book borrowed successfully',
                    book: {
                      title: req.book.title,
                      returnDate: borrowedBook.dueDate,
                      returned: borrowedBook.returned
                    }
                  });
                }
              }).catch(error => res.status(400).send(error)))
          .catch(error => res.status(500).send({
            error: 'Request could not be processed, please try again later'
          }));
      });
  },

  // Borrow History method with returned query string
  borrowHistory(req, res) {
    const query = { userId: req.auth.id };
    if (req.query.returned === 'true') {
      query.returned = true;
    } else if (req.query.returned === 'false') { query.returned = false; }
    return db.UserBook
      .findAll({
        include: [{
          model: db.Book,
          attributes: ['title', 'author'],
        }],
        where: query
      }).then(borrowedBooks => res.status(200).send(borrowedBooks))
      .catch((error) => {
        if (error) {
          return res.status(500).send({
            error: 'Request could not be processed, please try again later'
          });
        }
      });
  },

  // Return book method
  returnBook(req, res) {
    // Update users borrow history if the user borrowed
    if (req.book.borrowedQuantity === 0 && req.book.isBorrowed === false) {
      return res.status(400).send({ error: 'You cannot return a book that has not been borrowed' });
    }

    return db.UserBook
      .update({
        returned: true
      }, {
        where: {
          userId: req.auth.id,
          bookId: req.book.id,
          returned: false,
        }
      })
      .then((updateResult) => {
        if (Number.parseInt(updateResult, [10]) === 1) {
          return req.book
            .update({
              borrowedQuantity: (req.book.borrowedQuantity - 1),
              isBorrowed: ((req.book.borrowedQuantity) - 1) > 0,
            })
            .then(result => res.status(200).send({ message: 'Book was returned successfully',
              book: {
                title: req.book.title,
                returned: true
              }
            }))
            .catch(error => res.status(500).send({
              error: 'Request could not be processed, please try again later'
            }));
        }
        return res.status(404).send({ error: 'Book was not found in your borrowed list' });
      })
      .catch(error => res.status(500).send({
        error: 'Request could not be processed, please try again later'
      }));
  },

};
