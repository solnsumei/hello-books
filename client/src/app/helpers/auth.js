import jwt from 'jsonwebtoken';

const setUser = (token = null) => {
  const userToken = localStorage.getItem('userToken');

  if (!token && !userToken) return false;

  // Verify token using jsonwebtokens
  jwt.verify((!token ? userToken : token), process.env.SECRET, (err, decoded) => {
    if (err) {
      if (userToken) {
        localStorage.removeItem('userToken');
      }
      return false;
    }

    if (token) localStorage.setItem('userToken', token);
    return decoded.user;
  });
};

export default setUser;
