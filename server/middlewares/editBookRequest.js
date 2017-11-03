import validationHelper from '../helpers/validationHelper';

/**
 * Middleware to check edit book request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function editBookRequest(req, res, next) {
  if (!parseInt(req.params.bookId, 10)) {
    return res.status(400).send({ error: 'Please provide a valid book id' });
  }

  const rules = {
    title: 'required|string|min:2|max:150',
    author: 'required|string|min:2|max:50',
    categoryId: 'required|numeric|min:1',
    description: 'required',
    coverPic: 'required|string'
  };

  return validationHelper(req, res, next, rules, {
    categoryId: 'book category',
    coverPic: 'cover picture'
  });
}
