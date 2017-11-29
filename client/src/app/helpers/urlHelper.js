
const urlHelper = (url, page, limit) => {
  if (!url) {
    return null;
  }

  let returnString = `${url}?`;

  if (page) {
    returnString += `page=${page}`;
  }
  if (limit) {
    if (page) {
      returnString += '&';
    }
    returnString += `limit=${limit}`;
  }

  return returnString;
};

export default urlHelper;
