import db from '../models/index';

const findBookById = (req, res, next, id) => {
  if (!parseInt(id, 10)) {
    return res.status(400).send({ error: 'a valid book id is required' });
  }

  return db.Book.scope('active').findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ error: 'Book not found' });
      }
      req.book = book;
      return next();
    });
};

export default findBookById;
