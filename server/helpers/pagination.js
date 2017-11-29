const pagination = (page, limit) => {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10) || 10;

  limit = limit < 1 ? 10 : limit;

  if (!page) {
    return { limit };
  }

  if (page < 1 || limit < 1) {
    return { limit };
  }

  if (page > 1) {
    return { offset: (page - 1) * limit, limit };
  }

  return { limit };
};

export default pagination;
