const sequelizeErrorHandler = (error, res) => {
  const errors = {};
  error.errors.forEach((err) => {
    errors[err.path] = [err.message];
  });

  return res.status(409).send({
    errors
  });
};

const errorResponseHandler = (res, message = null, statusCode = null, error = null) => {
  if (error && error.name === 'SequelizeUniqueConstraintError') {
    return sequelizeErrorHandler(error, res);
  }

  if (message && statusCode) {
    return res.status(statusCode).send({
      error: message
    });
  }

  return res.status(500).send({
    error: 'Request could not be completed, please try again later'
  });
};

export default errorResponseHandler;
