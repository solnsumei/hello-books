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
    errors,
    success: false
  });
};

const errorResponseHandler = (res, message = null, statusCode = null, error = null) => {
  if (error && (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError')) {
    return sequelizeErrorHandler(error, res);
  }

  if (error && error.name === 'oldPassword') {
    return res.status(400).send({
      errors: {
        oldPassword: ['Wrong password entered']
      }
    });
  }

  if (error && error.name === 'Entry') {
    return res.status(400).send({
      errors: {
        entry: ['Entry field is required']
      }
    });
  }

  if (message && statusCode) {
    return res.status(statusCode).send({
      error: message,
      success: false,
    });
  }

  return res.status(500).send({
    error: 'Request could not be completed, please try again later',
    success: false
  });
};

export default errorResponseHandler;
