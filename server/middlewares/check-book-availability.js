import db from '../models'

export default function checkBookAvailability(req, res, next){
  if (req.body.bookId === null || !Number.isInteger(Number.parseInt(req.body.bookId))) {
    return res.status(400).send({ error: 'Valid book Id is required' });
  }

  return db.Book.scope('active').findById(req.body.bookId)
    .then(book => {
      if (!book) {
        return res.status(404).send({error: 'Book not found'});
      }
      req.book = book;
      next();
    });
};