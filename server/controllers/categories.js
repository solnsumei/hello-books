import slug from 'slug';
import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

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
    return models.Category
      .create({
        name: req.body.name.trim(),
        slug: slug(req.body.name.toLowerCase()),
      })
      .then(category => res.status(201).send({
        success: true,
        message: 'Category was saved successfully',
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug
        }
      }))
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  /**
   * Method to get all categories
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise.<Object>} categories
   */
  getAllCategories(req, res) {
    return models.Category
      .findAll({
        attributes: ['id', 'name', 'slug']
      })
      .then(categories => res.status(200).send({
        success: true,
        message: 'Categories loaded successfully',
        categories
      }))
      .catch(() => errorResponseHandler(res));
  },

  /**
   * This updates the category
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} category
   */
  update(req, res) {
    return req.category.update({
      name: (req.body.name ? req.body.name.trim() : req.category.name),
      slug: (req.body.name ? slug(req.body.name.toLowerCase()) : req.category.slug)
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
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  delete(req, res) {
    return req.category.getBooks({ where: { isDeleted: false } })
      .then((books) => {
        if (books.length > 0) {
          return res.status(409).send({
            error: 'This category still has books attached to it so cannot be deleted at this time'
          });
        }
        return req.category.destroy()
          .then(() => res.status(200).send({
            success: true,
            message: 'Category was deleted successfully',
            data: { deletedCatgoryId: req.category.id }
          }))
          .catch(() => errorResponseHandler(res));
      });
  }
};
