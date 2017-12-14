import bcrypt from 'bcryptjs';
import moment from 'moment';
import Validator from 'validatorjs';
import createToken from '../helpers/token';
import { formatUser, formatBorrowedBook } from '../helpers/formatData';
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
  /**
   * Validates google parameters for gool=gl login
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {function} create
   * @return {array} errors
   */
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

  /**
   * Method create user account
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {Object} user
   * @return {boolean} success
   */
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
        // Returns logged in user
        return res.status(201).send({
          success: true,
          message: 'User created successfully',
          user: formatUser(user),
          token
        });
      })
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  /**
   * Gets user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {Object} user
   * @return {boolean} success
  */
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
          user: formatUser(req.auth)
        });
      })
      .catch(error => res.status(503).send(error));
  },

  /**
   * Update user profile
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {Object} user
   * @return {boolean} success
  */
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
            user: formatUser(req.auth),
          });
        }
        return errorResponseHandler(res);
      })
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  /**
   * Change password method
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @return {function} errorResponseHandler
   */
  changePassword(req, res) {
    return models.User
      .findById(req.auth.id)
      .then((user) => {
        if (user) {
          if (user.googleUser) {
            return errorResponseHandler(res, 'You are logged in through google so cannot change your password', 409);
          }
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
        return errorResponseHandler(res, 'User not found', 404);
      })
      .catch(() => errorResponseHandler(res));
  },

  /**
   * Authenticate user
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @returns {Object} user
   * @return {function} errorResponseHandler
   */
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
            user: formatUser(user),
            token
          });
        }
        return errorResponseHandler(res, 'Username and/or password is incorrect', 401);
      }).catch(() => errorResponseHandler(res));
  },

  /**
   * Borrow book method
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @returns {Object} borrowedBook
   * @return {function} errorResponseHandler
   */
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
                    borrowedBook: formatBorrowedBook(borrowedBook, req.book),
                  });
                }
              })
              .catch(() => errorResponseHandler(res)))
          .catch(() => errorResponseHandler(res));
      })
      .catch(() => errorResponseHandler(res));
  },

  /**
   * View borrow history method by user
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @returns {array} borrowedBooks
   * @return {function} errorResponseHandler
   */
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

  /**
   * Method for returning a borrowed book
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @returns {Object} retrunedBook
   * @return {function} errorResponseHandler
   */
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
                    returnedBook: formatBorrowedBook(borrowedBook, req.book),
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
