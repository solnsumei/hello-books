import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

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
   * @returns {Object} membershipTypes
   */
  getAllMemberShipTypes(req, res) {
    let attributes = ['level'];

    if (req.auth.admin) {
      attributes = [...attributes,
        'id',
        'lendDuration',
        'maxBorrowable'
      ];
    }

    return models.Membership
      .findAll({
        attributes,
      })
      .then(memberships => res.status(200).send({
        success: true,
        message: 'Membership types loaded successfully',
        memberships
      }))
      .catch(() => errorResponseHandler(res));
  },

  /**
   * This updates the membershipType in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} membership
   */
  update(req, res) {
    if (!parseInt(req.params.membershipId, 10)) {
      return errorResponseHandler(res, 'Membership id is invalid', 400);
    }
    return models.Membership
      .findById(req.params.membershipId)
      .then((membership) => {
        if (!membership) {
          return errorResponseHandler(res, 'Membership type was not found', 404);
        }
        return membership.update({
          lendDuration: req.body.lendDuration,
          maxBorrowable: req.body.maxBorrowable,
        }).then((result) => {
          if (result) {
            return res.status(200).send({
              success: true,
              message: 'Membership type updated successfully',
              membership: {
                id: membership.id,
                level: membership.level,
                lendDuration: membership.lendDuration,
                maxBorrowable: membership.maxBorrowable
              }
            });
          }
        })
          .catch(() => errorResponseHandler(res));
      });
  },
};
