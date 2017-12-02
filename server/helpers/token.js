import jwt from 'jsonwebtoken';

const createToken = (user, reset = null) => {
  // Create token
  const token = jwt.sign({ user: {
    id: !reset ? user.id : user.username
  } }, process.env.SECRET, {
    expiresIn: 60 * 60 * 2
  });

  if (token) return token;
  return null;
};

export default createToken;
