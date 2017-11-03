import db from '../models/index';
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
      .then(membershipTypes => res.status(200).send({ membershipTypes }))
      .catch(() => errorResponseHandler(res));
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
          return errorResponseHandler(res, 'MembershipType was not found', 404);
        }
        return membershipType.update({
          lendDuration: req.body.lendDuration,
          maxBorrowable: req.body.maxBorrowable,
        }).then((result) => {
          if (result) {
            return res.status(200).send({
              message: 'Membership type updated successfully',
              membershipType: {
                id: membershipType.id,
                membershipType: membershipType.membershipType,
                lendDuration: membershipType.lendDuration,
                maxBorrowable: membershipType.maxBorrowable
              }
            });
          }
        })
          .catch(() => errorResponseHandler(res));
      });
  },
};
