import db from '../models/index';

/**
 * Middleware to check for valid category request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export function categoryRequest(req, res, next) {
  if (req.body.name === undefined || req.body.name === null) {
    return res.status(400).send({ error: 'Category name is required' });
  }

  next();
}

/**
 * Middleware to check if category is valid
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @param {int} id
 *
 * @returns {Request|Response|*|void|boolean} res
 */
function validateCategory(req, res, next, id) {
  if (!parseInt(id, 10)) {
    return res.status(400).send({ error: 'a valid category id is required' });
  }

  return db.Category.findById(id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({ error: 'Category not found' });
      }

      req.category = category;

      next();
    });
}


/**
 * Middleware to check for valid category Id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export function validateCategoryId(req, res, next) {
  return validateCategory(req, res, next, req.body.categoryId);
}

/**
 * Middleware to check for valid category Id URL parameter
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export function validateCategoryIdParam(req, res, next) {
  return validateCategory(req, res, next, req.params.categoryId);
}
