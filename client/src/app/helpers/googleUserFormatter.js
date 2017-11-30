const googleUserFormatter = (payload) => {
  if (!payload) {
    return false;
  }
  const { profileObj } = payload;
  return {
    email: profileObj.email,
    username: profileObj.googleId,
    firstName: profileObj.givenName,
    surname: profileObj.familyName,
    password: `H2536${profileObj.googleId}`,
    googleUser: true
  };
};

export default googleUserFormatter;
