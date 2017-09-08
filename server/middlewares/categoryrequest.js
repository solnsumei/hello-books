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
 * Find category by id
 * @param  {Integer} id [description]
 * @return {Object}    [description]
 */
function findCategory(id) {
  return db.Category.findById(id)
    .then((category) => {
      if (!category) {
        return false;
      }
      return category;
    });
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
  if (req.body.categoryId === undefined || req.body.categoryId === null ||
    !Number.isInteger(Number.parseInt(req.body.categoryId, 10))) {
    return res.status(400).send({ error: 'a valid category id is required' });
  }

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
  if (req.params.categoryId === undefined || req.params.categoryId === null ||
    !Number.isInteger(Number.parseInt(req.params.categoryId, 10))) {
    return res.status(400).send({ error: 'a valid category id is required' });
  }

  return validateCategory(req, res, next, req.params.categoryId);
}
