
/**
* Formats the url for axios query when using pagination
* @param {string} url - api endpoint url
* @param {number} page - page count
* @param {number} limit - item limit per page
*
* @return {string} formatted url
*/
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
