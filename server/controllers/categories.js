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
        name: req.body.name,
        slug: slug(req.body.name),
      })
      .then(category => res.status(201).send(category))
      .catch(error => {
        if(error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError'){
          const errors = {};
          for (let err of error.errors){
            errors[err.path] = err.message;
          }

          if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).send({errors});
          }
          return res.status(400).send({errors});
        }

        return res.status(503).send({
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
        attributes: ['name']
      })
      .then(categories => res.status(200).send(categories))
      .catch(error => {
        if(error){
          return res.status(500).send({
            error: 'Request could not be processed, please try again later'
          });
        }
      });
  },

  /**
   * This updates the category
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} category
   */
  update(req, res) {
    return db.Category
      .findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.status(404).send({ error: 'Category not found' });
        }
        category.update({
          name: req.body.name,
          slug: slug(req.body.name)
        }).then((result) => {
          if (result) {
            return res.status(200).send(category);
          }
        })
          .catch(error => {
            if(error.name === 'SequelizeValidationError' ||
              error.name === 'SequelizeUniqueConstraintError'){
              const errors = {};
              for (let err of error.errors){
                errors[err.path] = err.message;
              }

              if(error.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).send({errors});
              }
              return res.status(400).send({errors});
            }

            return res.status(500).send({
              error: 'Request could not be processed, please try again later'
            });

          });
      });
  },

  delete(req, res){
    return db.Category
      .findById(req.body.categoryId)
      .then(category => {
        if (!category) {
          return res.status(404).send({ error: 'Category not found' });
        }

        category.destroy()
          .then(() => res.status(200).send({
            success: true,
            message: 'Category was deleted successfully'
          }));

      });
  },
};
