import slug from 'slug';
import db from '../models/index';

/**
 * Controller for adding, updating categories
 * @exports {Object} categoriesController
 */
export default {

  /**
   * This creates book category
   * @param {Object} req
   * @param {Object} res
   *
   * @return {Bluebird<Object> | Promise.<Object>} res
   */
  create(req, res) {
    return db.Category
      .create({
        name: req.body.name.trim(),
        slug: slug(req.body.name.toLowerCase()),
      })
      .then(category => res.status(201).send({
        message: 'Category was saved successfully',
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug
        }
      }))
      .catch((error) => {
        if (error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ errors });
          }
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error: 'Request could not be processed, please try again later'
        });
      });
  },

  /**
   * Method to get all categories
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} categories
   */
  getAllCategories(req, res) {
    return db.Category
      .findAll({
        attributes: ['id', 'name', 'slug']
      })
      .then(categories => res.status(200).send({ categories }))
      .catch(() => res.status(500).send({
        error: 'Request could not be processed, please try again later'
      }));
  },

  /**
   * This updates the category
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} category
   */
  update(req, res) {
    return req.category.update({
      name: req.body.name.trim(),
      slug: slug(req.body.name.toLowerCase())
    }).then((result) => {
      if (result) {
        return res.status(200).send({
          success: true,
          message: 'Category updated successfully',
          category: {
            id: req.category.id,
            name: req.category.name,
            slug: req.category.slug
          }
        });
      }
    })
      .catch((error) => {
        if (error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ errors });
          }
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error: 'Request could not be processed, please try again later'
        });
      });
  },

  delete(req, res) {
    return req.category.getBooks()
      .then((books) => {
        if (books.length > 0) {
          return res.status(400).send({
            error: 'This category still has books attached to it so cannot be deleted at this time'
          });
        }
        return req.category.destroy()
          .then(() => res.status(200).send({
            success: true,
            message: 'Category was deleted successfully'
          }))
          .catch(() => res.status(500).send({
            error: 'Request could not be completed at this time'
          }));
      });
  }
};
