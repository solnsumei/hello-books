import bcrypt from 'bcryptjs';
import moment from 'moment';
import Validator from 'validatorjs';
import nodemailer from 'nodemailer';
import createToken from '../helpers/createToken';
import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';
import formHelper from '../helpers/formHelper';
import upgradeUserLevel from '../helpers/upgradeUserLevel';
import pagination from '../helpers/pagination';
import { transport, mailOptions } from '../helpers/mailHelper';

/**
 * User controller to handle user request
 * @export userController
 */
const passwordController = {
  /**
   * Forgot password method
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @return {function} errorResponseHandler
   */
  forgotPassword(req, res) {
    if (!req.body.entry) {
      return errorResponseHandler(res, null, null, { name: 'Entry' });
    }

    return models.User.findOne({ where: {
      $or: [
        { username: req.body.entry },
        { email: req.body.entry }
      ]
    } })
      .then((user) => {
        if (user) {
          if (user.googleUser) {
            return errorResponseHandler(res, 'Please use the google login button', 409);
          }
          const token = createToken(user, true);
          if (!token) {
            return errorResponseHandler(res);
          }

          return user.update({
            resetPassword: true
          })
            .then((result) => {
              if (result) {
                user.resetToken = token;

                transport.sendMail(mailOptions(user, 'Forgot Password'), (error, info) => {
                  if (error) {
                    return errorResponseHandler(res);
                  }

                  return res.status(200).send({
                    success: true,
                    message: 'Reset message has been sent to your registered email.'
                  });
                });
              }
            })
            .catch(error => errorResponseHandler(res, null, null, error));
        }
        return errorResponseHandler(res, 'No user with this email or username found', 404);
      })
      .catch(() => errorResponseHandler(res));
  },

  /**
   * Reset password
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @return {string} message
   * @return {boolean} success
   * @return {function} errorResponseHandler
   */
  resetPassword(req, res) {
    if (req.reset && !req.reset.googleUser) {
      return req.reset.update({
        password: bcrypt.hashSync(req.body.password, 10),
        resetPassword: false
      })
        .then((result) => {
          if (result) {
            return res.status(200).send({
              success: true,
              message: 'Password reset was successful, please login with your new password',
            });
          }
        })
        .catch(error => errorResponseHandler(res, null, null, error));
    }
    return errorResponseHandler(res);
  }
};

export default passwordController;
