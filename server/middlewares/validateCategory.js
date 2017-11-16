import db from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Middleware to check if category exists
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function validateCategory(req, res, next) {
  let categoryId = null;
  if (req.url === '/books' || (/books/g).test(req.url)) {
    categoryId = req.body.categoryId;
    if (req.url !== '/books') {
      if (!categoryId) {
        return next();
      }
    }
  } else {
    categoryId = req.params.categoryId;
  }

  if (!parseInt(categoryId, 10)) {
    return errorResponseHandler(res, 'Category id is invalid', 400);
  }

  return db.Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        return errorResponseHandler(res, 'Category not found', 404);
      }
      req.category = category;
      next();
    });
}

