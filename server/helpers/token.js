import jwt from 'jsonwebtoken';

const createToken = (user, reset = null) => {
  // Create token
  if (user !== null && typeof user !== 'object') {
    return null;
  }

  const token = jwt.sign({ user: {
    id: !reset ? user.id : user.username
  } }, process.env.SECRET, {
    expiresIn: 60 * 60 * 2
  });

  return token;
};

export default createToken;
