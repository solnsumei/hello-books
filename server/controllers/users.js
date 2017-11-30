import bcrypt from 'bcryptjs';
import moment from 'moment';
import Validator from 'validatorjs';
import createToken from '../helpers/token';
import { formatUserObject, formatBorrowedBookObject } from '../helpers/formatData';
import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';
import formHelper from '../helpers/formHelper';
import upgradeUserLevel from '../helpers/upgradeUserLevel';
import pagination from '../helpers/pagination';

/**
 * User controller to handle user request
 * @export userController
 */
const userController = {
  checkGoogleParams(req, res) {
    const validationData = formHelper.signup();
    const validation = new Validator(req.body, validationData.rules);
    if (validationData.customMessage) {
      validation.setAttributeNames(validationData.customMessage);
    }

    if (validation.fails()) {
      return res.status(400).send({
        errors: validation.errors.errors
      });
    }
    return userController.create(req, res);
  },
  // Create a user account in database
  create(req, res) {
    const { firstName, surname, username, email, password } = req.body;
    return models.User
      .create({
        firstName,
        surname,
        username: username.toLowerCase(),
        email,
        password,
        googleUser: req.body.googleUser || false
      })
      .then((user) => {
        const token = createToken(user);
        if (!token) {
          return errorResponseHandler(res);
        }
        // Return logged in user
        return res.status(201).send({
          success: true,
          message: 'User created successfully',
          user: formatUserObject(user),
          token
        });
      })
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  // Get a single user
  getUser(req, res) {
    return models.BorrowedBook.findAndCountAll({ where: { userId: req.auth.id } })
      .then((result) => {
        req.auth.borrowedCount = result.count;
        if (result.count > 0) {
          req.auth.notReturned = result.rows.filter(row => row.returned === false).length;
        }
        req.auth.notReturned = req.auth.notReturned || 0;
        return res.status(200).send({
          success: true,
          message: 'User was loaded successfully',
          user: formatUserObject(req.auth)
        });
      })
      .catch(error => res.status(503).send(error));
  },

  // Update a user account in database
  updateProfile(req, res) {
    const { firstName, surname } = req.body;
    req.auth.update({
      firstName: firstName || req.auth.firstName,
      surname: surname || req.auth.surname,
    })
      .then((result) => {
        if (result) {
          // Return logged in user
          return res.status(200).send({
            message: 'User profile updated successfully',
            success: true,
            user: formatUserObject(req.auth),
          });
        }
        return errorResponseHandler(res);
      })
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  // Change user password
  changePassword(req, res) {
    return models.User
      .findById(req.auth.id)
      .then((user) => {
        if (user && !user.googleUser) {
          if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
            // update password if the old password was entered correctly
            return user.update({
              password: bcrypt.hashSync(req.body.password, 10)
            })
              .then((result) => {
                if (result) {
                  return res.status(200).send({
                    success: true,
                    message: 'Your Password was changed successfully',
                  });
                }
              })
              .catch(error => errorResponseHandler(res, null, null, error));
          }
          return errorResponseHandler(res, null, null, { name: 'oldPassword' });
        }
        if (user.googleUser) {
          return errorResponseHandler(res, 'You are logged in through google so cannot change your password', 409);
        }
        return errorResponseHandler(res, 'User not found', 404);
      })
      .catch(() => errorResponseHandler(res));
  },

  // Authenticate users
  login(req, res) {
    return models.User
      .findOne({ where: {
        username: req.body.username
      } })
      .then((user) => {
        if (!user) {
          if (req.body.googleUser) {
            return userController.checkGoogleParams(req, res);
          }

          return errorResponseHandler(res, 'Username and/or password is incorrect', 401);
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          // Create token
          const token = createToken(user);
          if (!token) {
            return errorResponseHandler(res);
          }
          // Return logged in user
          return res.status(200).send({
            success: true,
            message: `Welcome back ${user.username}`,
            user: formatUserObject(user),
            token
          });
        }
        return errorResponseHandler(res, 'Username and/or password is incorrect', 401);
      }).catch(() => errorResponseHandler(res));
  },

  // Borrow book
  borrowBook(req, res) {
    if (req.book.stockQuantity === req.book.borrowedQuantity) {
      return errorResponseHandler(res, 'No copies available for borrowing', 404);
    }

    return models.BorrowedBook.findOne({
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

        return models.BorrowedBook
          .create({
            userId: req.auth.id,
            bookId: req.book.id,
            borrowDate: (new Date()),
            dueDate,
          })
          .then(borrowedBook =>
            req.book
              .update({
                borrowedQuantity: (req.book.borrowedQuantity + 1),
                isBorrowed: true,
              }).then((result) => {
                if (result) {
                  return res.status(200).send({
                    success: true,
                    message: 'Book borrowed successfully',
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
    const { offset, limit } = pagination(req.query.page, req.query.limit);

    if (req.query.returned === 'true') {
      query.returned = true;
    } else if (req.query.returned === 'false') { query.returned = false; }
    return models.BorrowedBook
      .findAndCountAll({
        attributes: ['id', 'bookId', 'dueDate', 'isSeen', 'returned', 'borrowDate', 'returnDate'],
        order: [['id', 'DESC']],
        include: [{
          model: models.Book,
          as: 'book',
          attributes: ['title', 'isDeleted'],
        }],
        offset,
        limit,
        where: query
      }).then(borrowedBooks => res.status(200).send({
        success: true,
        message: 'Borrow history loaded successfully',
        borrowedBooks
      }))
      .catch(() => errorResponseHandler(res));
  },

  // Return book method
  returnBook(req, res) {
    // Update users borrow history if the user borrowed
    if (req.book.borrowedQuantity === 0 && req.book.isBorrowed === false) {
      return errorResponseHandler(res, 'You cannot return a book that has not been borrowed', 400);
    }

    const attributes = ['id', 'bookId', 'dueDate', 'isSeen', 'returned', 'borrowDate', 'returnDate'];

    return models.BorrowedBook
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
            returnDate: (new Date()),
            isSeen: false,
          })
          .then((updateResult) => {
            if (updateResult.dataValues.returned) {
              return req.book
                .update({
                  borrowedQuantity: (req.book.borrowedQuantity - 1),
                  isBorrowed: ((req.book.borrowedQuantity) - 1) > 0,
                })
                .then((result) => {
                  upgradeUserLevel(req.auth);

                  return res.status(200).send({
                    success: true,
                    message: 'Book was returned successfully',
                    returnedBook: formatBorrowedBookObject(borrowedBook, req.book),
                  });
                })
                .catch(() => errorResponseHandler(res));
            }
          })
          .catch(() => errorResponseHandler(res));
      })
      .catch(() => errorResponseHandler(res));
  }
};

export default userController;
