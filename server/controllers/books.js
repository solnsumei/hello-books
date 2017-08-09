import db from '../models';

export default {

  // Method to add book
  create(req, res) {
    return db.Book
      .create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        coverPic: req.body.coverPic,
        stockQuantity: req.body.stockQuantity,
      })
      .then(book => res.status(201).send(book))
      .catch(error => res.status(400).send(error.errors));
  },

  // Method to get books from library
  index(req, res) {
    return db.Book
      .scope('active')
      .findAll({
        attributes: ['id', 'title', 'author', 'description', 'coverPic']
      })
      .then(books => res.status(200).send({ message: 'Books Catalog', books: books}))
      .catch(error => res.status(400).send(error));
  },

  // Method to update a book
  update(req, res) {
    if (req.params.bookId === null) {
      return res.status(400).send({ error: 'Book id cannot be null' });
    }

    req.checkParams('bookId', 'BookId is invalid').isNumeric();

    req.getValidationResult()
      .then((result) => {
        if (!result.isEmpty()) {
          return res.status(400).send(result.array());
        }
      });

    return db.Book
      .scope('active')
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ error: 'Book not found' });
        }
        book.update({
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          coverPic: req.body.coverPic
        }).then(result => res.status(200).send(result))
          .catch(error => res.status(400).send(error.errors));
      });
  },
};
