import jwt from 'jsonwebtoken';

const createToken = (user) => {
  // Create token
  const token = jwt.sign({ user: {
    id: user.id
  } }, process.env.SECRET, {
    expiresIn: 60 * 60 * 2
  });

  if (token) return token;
  return null;
};

export default createToken;
