import db from '../models/index';

/**
 * Controller for fetching, updating membershiptypes
 * @exports {Object} booksController
 */
export default {

  /**
   * Method to get all membershipTypes from the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} membershipTypes
   */
  getAllMemberShipTypes(req, res) {
    let attributes = ['membershipType'];

    if (req.auth.admin) {
      attributes = [...attributes,
        'id',
        'lendDuration',
        'maxBorrowable'
      ];
    }

    return db.MembershipType
      .findAll({
        attributes,
      })
      .then(membershipTypes => res.status(200).send(membershipTypes))
      .catch((error) => {
        if (error) {
          return res.status(500).send({
            error: 'Request could not be processed, please try again later'
          });
        }
      });
  },

  /**
   * This updates the membershipType in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} membershipTypeId
   */
  update(req, res) {
    return db.MembershipType
      .findById(req.params.membershipTypeId)
      .then((membershipType) => {
        if (!membershipType) {
          return res.status(404).send({ error: 'MembershipType was not found' });
        }
        membershipType.update({
          lendDuration: req.body.lendDuration,
          maxBorrowable: req.body.maxBorrowable,
        }).then((result) => {
          if (result) {
            return res.status(200).send(membershipType);
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
      });
  },
};
