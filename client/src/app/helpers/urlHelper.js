
const urlHelper = (url, page, limit) => {
  let returnString = `${url}`;

  if (page) {
    returnString += `?page=${page}`;
  }
  if (limit) {
    returnString += page ? `&limit=${limit}` : `?limit=${limit}`;
  }
  return returnString;
};

export default urlHelper;
