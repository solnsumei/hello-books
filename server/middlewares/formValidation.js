import Validator from 'validatorjs';
import requestType from '../helpers/requestTypes';
import formHelper from '../helpers/formHelper';


/**
 * Form validation middleware
 * 
 * @export
 * @param {string} type
 * @returns {Object} res
 */
export default function formValidation(type) {
  let validationData = null;
  switch (type) {
    case requestType.SIGNUP:
      validationData = formHelper.signup();
      break;
    case requestType.LOGIN:
      validationData = formHelper.login();
      break;
    case requestType.UPDATE_PROFILE:
      validationData = formHelper.updateProfile();
      break;
    case requestType.CHANGE_PASSWORD:
      validationData = formHelper.changePassword();
      break;
    case requestType.ADD_BOOK:
      validationData = formHelper.addBook();
      break;
    case requestType.EDIT_BOOK:
      validationData = formHelper.editBook();
      break;
    case requestType.ADD_QUANTITY:
      validationData = formHelper.addQuantity();
      break;
    case requestType.ADD_CATEGORY:
      validationData = formHelper.addCategory();
      break;
    case requestType.EDIT_CATEGORY:
      validationData = formHelper.editCategory();
      break;
    case requestType.EDIT_MEMBERSHIP_TYPE:
      validationData = formHelper.editMembershipType();
      break;
    default:
      break;
  }

  return function validate(req, res, next) {
    const validation = new Validator(req.body, validationData.rules);

    if (validationData.customMessage) {
      validation.setAttributeNames(validationData.customMessage);
    }

    if (validation.fails()) {
      return res.status(400).send({
        errors: validation.errors.errors
      });
    }

    return next();
  };
}
