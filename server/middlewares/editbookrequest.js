/**
 * Middleware to check edit book request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function editBookRequest(req, res, next) {

  const errors = {};

  if (req.params.bookId === undefined || req.params.bookId === null ||
    !Number.isInteger(Number.parseInt(req.params.bookId, 10))) {
    return res.status(400).send({ error: 'Please provide a valid book id' });
  }

  if (req.body.title === undefined || req.body.title === null) {
    errors.title = 'Title is required';
  }

  if (req.body.author === undefined || req.body.author === null) {
    errors.author = 'Author is required';
  }

  if (req.body.description === undefined || req.body.description === null) {
    errors.description = 'Description is required';
  }

  if (req.body.coverPic === undefined || req.body.coverPic === null) {
    errors.coverPic = 'Cover Picture is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({errors});
  }

  next();
}