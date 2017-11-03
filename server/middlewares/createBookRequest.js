import validationHelper from '../helpers/validationHelper';

/**
 * Middleware to check the create book request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function createBookRequest(req, res, next) {
  const rules = {
    title: 'required|string|min:2|max:150',
    author: 'required|string|min:2|max:50',
    categoryId: 'required|numeric|min:1',
    stockQuantity: 'required|numeric|min:1',
    description: 'required',
    coverPic: 'required|string'
  };

  return validationHelper(req, res, next, rules, {
    categoryId: 'book category',
    stockQuantity: 'stock quantity',
    coverPic: 'cover picture'
  });
}
