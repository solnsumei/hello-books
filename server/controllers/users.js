import bcrypt from 'bcryptjs';
import createToken from '../helpers/token';
import { formatBorrowedBookObject } from '../helpers/formatData';
import db from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * User controller to handle user request
 * @export userController
 */
export default {
  // Create a user account in database
  create(req, res) {
    const { firstName, surname, username, email, password } = req.body;
    return db.User
      .create({
        firstName,
        surname,
        username: username.toLowerCase(),
        email,
        password
      })
      .then((user) => {
        const token = createToken(user);
        if (!token) {
          return errorResponseHandler(res);
        }
        // Return logged in user
        return res.status(201).send({
          message: 'User created successfully',
          userId: user.id,
          username: user.username,
          token
        });
      })
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  // Get a single user
  getUser(req, res) {
    if (!parseInt(req.params.userId, 10)) {
      return errorResponseHandler(res, 'User Id is invalid', 400);
    }

    if (req.auth.id !== parseInt(req.params.userId, 10)) {
      return errorResponseHandler(res, 'You are not authorised to perform this action', 401);
    }

    return db.User
      .findOne({
        attributes: ['id', 'firstName', 'surname', 'email', 'username', 'admin'],
        where: { id: req.auth.id }
      })
      .then((user) => {
        if (user) {
          return res.status(200).send({ user });
        }
        return errorResponseHandler(res, 'User not found', 404);
      })
      .catch(() => errorResponseHandler(res));
  },

  // Update a user account in database
  updateProfile(req, res) {
    const { firstName, surname, membershipType } = req.body;
    return db.User
      .findById(req.auth.id)
      .then((user) => {
        if (user) {
          user.update({
            firstName,
            surname,
            membershipType
          })
            .then((result) => {
              if (result) {
                const token = createToken(user);
                if (!token) {
                  return errorResponseHandler(res);
                }
                // Return logged in user
                return res.status(200).send({
                  message: 'User profile updated successfully',
                  success: true,
                  username: user.username,
                  token
                });
              }
              return errorResponseHandler(res);
            })
            .catch(error => errorResponseHandler(res, null, null, error));
        }
      })
      .catch(() => errorResponseHandler(res));
  },

  // Change user password
  changePassword(req, res) {
    return db.User
      .findById(req.auth.id)
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
            // update password if the old password was entered correctly
            return user.update({
              password: bcrypt.hashSync(req.body.password, 10)
            })
              .then((result) => {
                if (result) {
                  return res.status(200).send({
                    message: 'Your Password was changed successfully',
                  });
                }
                return errorResponseHandler(res);
              })
              .catch(error => errorResponseHandler(res, null, null, error));
          }
          return res.status(400).send({
            errors: {
              oldPassword: ['Wrong password entered']
            }
          });
        }
        return errorResponseHandler(res, 'User not found', 404);
      })
      .catch(() => errorResponseHandler(res));
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
          const token = createToken(user);
          if (!token) {
            return errorResponseHandler(res);
          }
          // Return logged in user
          return res.status(200).send({
            message: `Welcome back ${user.username}`,
            userId: user.id,
            username: user.username,
            token
          });
        }
        return errorResponseHandler(res, 'Username and/or password is incorrect', 401);
      }).catch(() => errorResponseHandler(res));
  },

  // Borrow book
  borrowBook(req, res) {
    if (req.book.stockQuantity === req.book.borrowedQuantity) {
      return errorResponseHandler(res, 'No copies available for borrowing', 400);
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
          return errorResponseHandler(res, 'You already borrowed this book', 409);
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
                    borrowedBook: formatBorrowedBookObject(borrowedBook, req.book),
                  });
                }
              })
              .catch(() => errorResponseHandler(res)))
          .catch(() => errorResponseHandler(res));
      })
      .catch(() => errorResponseHandler(res));
  },

  // Borrow History method with returned query string
  borrowHistory(req, res) {
    const query = { userId: req.auth.id };
    if (req.query.returned === 'true') {
      query.returned = true;
    } else if (req.query.returned === 'false') { query.returned = false; }
    return db.UserBook
      .findAll({
        attributes: ['id', 'bookId', 'dueDate', 'isSeen', 'returned', 'createdAt', 'updatedAt'],
        include: [{
          model: db.Book,
          attributes: ['title', 'isDeleted'],
        }],
        where: query
      }).then(borrowedBooks => res.status(200).send({ borrowedBooks }))
      .catch(() => errorResponseHandler(res));
  },

  // Return book method
  returnBook(req, res) {
    // Update users borrow history if the user borrowed
    if (req.book.borrowedQuantity === 0 && req.book.isBorrowed === false) {
      return errorResponseHandler(res, 'You cannot return a book that has not been borrowed', 400);
    }

    const attributes = ['id', 'userId', 'bookId',
      'dueDate', 'isSeen', 'returned', 'createdAt', 'updatedAt'];

    return db.UserBook
      .findOne({
        attributes,
        where: {
          bookId: req.book.id,
          userId: req.auth.id,
          returned: false
        }
      })
      .then((borrowedBook) => {
        if (!borrowedBook) {
          return errorResponseHandler(res, 'Book was not found in your borrowed list', 404);
        }

        return borrowedBook
          .update({
            returned: true,
            isSeen: false,
          })
          .then((updateResult) => {
            if (updateResult.dataValues.returned) {
              return req.book
                .update({
                  borrowedQuantity: (req.book.borrowedQuantity - 1),
                  isBorrowed: ((req.book.borrowedQuantity) - 1) > 0,
                })
                .then(result => res.status(200).send({ message: 'Book was returned successfully',
                  returnedBook: formatBorrowedBookObject(borrowedBook, req.book),
                }))
                .catch(() => errorResponseHandler(res));
            }
          })
          .catch(() => errorResponseHandler(res));
      })
      .catch(() => errorResponseHandler(res));
  },
};
