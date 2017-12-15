import jwt from 'jsonwebtoken';


/**
* Creates jwt token when user either
* sign up, log in or forgot password
* @param {Object} user - user
* @param {boolean} reset - reset password option
* 
* @return {string|void} token - jwt token or empty
*/
const createToken = (user, reset = null) => {
  // Create token
  if (user !== null && typeof user !== 'object') {
    return null;
  }

  // determines which type of token to create
  const token = jwt.sign({ user: {
    id: !reset ? user.id : user.username
  } }, process.env.SECRET, {
    expiresIn: 60 * 60 * 2
  });

  return token;
};

export default createToken;
