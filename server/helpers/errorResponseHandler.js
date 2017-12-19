/**
   * Handles Sequelize errors
   * @param {Object} error - error object
   * @param {Object} res - response object
   * 
   * @return {array} errors
   * @return {string} error
*/
const sequelizeErrorHandler = (error, res) => {
  const errors = {};
  let errorCode = 422;
  error.errors.forEach((err) => {
    errors[err.path] = [err.message];
  });

  if (error.name === 'SequelizeUniqueConstraintError') {
    errorCode = 409;
  }

  return res.status(errorCode).send({
    success: false,
    errors
  });
};

/**
   * Handles errors
   * @param {Object} res - response object
   * @param {string} message
   * @param {integer} statusCode - request object
   * @param {Object} error - error object
   * 
   * @return {array} errors
   * @return {string} error
*/
const errorResponseHandler = (res, message = null, statusCode = null, error = null) => {
  if (error && (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError')) {
    return sequelizeErrorHandler(error, res);
  }

  if (error && error.name === 'oldPassword') {
    return res.status(400).send({
      success: false,
      errors: {
        oldPassword: ['Wrong password entered']
      }
    });
  }

  if (error && error.name === 'Entry') {
    return res.status(400).send({
      success: false,
      errors: {
        entry: ['Entry field is required']
      }
    });
  }

  if (message && statusCode) {
    return res.status(statusCode).send({
      success: false,
      error: message,
    });
  }

  return res.status(500).send({
    success: false,
    error: 'Request could not be completed, please try again later',
  });
};

export default errorResponseHandler;
