// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../server/app';
import models from '../../server/models/index';
import { users, booksForBookTest, categoriesForBooksTest, invalidBooks } from '../mocks';

// Test add book route
describe('Book Routes', () => {
  const { freeUser, admin } = users;

  const { book1, book2, book3 } = booksForBookTest;
  const { category1, category2 } = categoriesForBooksTest;

  before((done) => {
    models.User.bulkCreate([freeUser, admin], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test users created \n');
        models.Category.bulkCreate([category1], {})
          .then(() => {
            process.stdout.write('Test categories created \n');
            request(app)
              .post('/api/v1/users/signin')
              .send({ username: freeUser.username, password: freeUser.password })
              .set('Accept', 'application/json')
              .end((err, res) => {
                freeUser.token = res.body.token;
                freeUser.id = res.body.userId;
                request(app)
                  .post('/api/v1/users/signin')
                  .send({ username: admin.username, password: admin.password })
                  .set('Accept', 'application/json')
                  .end((err, res) => {
                    admin.token = res.body.token;
                    request(app)
                      .post('/api/v1/categories')
                      .send(category2)
                      .set('x-token', admin.token)
                      .set('Accept', 'application/json')
                      .end((err, res) => {
                        category2.id = res.body.category.id;
                        book2.categoryId = category2.id;
                        book3.categoryId = book2.categoryId;
                        done();
                      });
                  });
              });
          });
      });
  });

  describe('GET Books  /api/v1/books', () => {
    it('should respond with an error when user is not authenticated', (done) => {
      request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should respond with an error when token is invalid or expired', (done) => {
      request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should return a list of books', (done) => {
      request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .expect(200)
        .expect('Content-Type', /json/, done);
    });
  });

  describe('POST Add book /api/v1/books', () => {
    it('should respond with an error when user is not authenticated', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(book1)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should respond with an error when token is invalid or expired', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .send(book2)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should respond with an error when user is not an admin', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send(book3)
        .expect(403)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Forbidden, admins only"/, done);
    });

    it('should respond with errors when no field is provided', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.title[0], 'The title field is required.');
          assert.equal(res.body.errors.author[0], 'The author field is required.');
          assert.equal(res.body.errors.categoryId[0], 'The category id field is required.');
          assert.equal(res.body.errors.coverPic[0], 'The cover picture field is required.');
          assert.equal(res.body.errors.stockQuantity[0], 'The stock quantity field is required.');
          done();
        });
    });

    it('should respond with errors when category with supplied categoryId does not exist',
      (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(invalidBooks.book1)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Category not found');
            done();
          });
      });

    it('should create book', (done) => {
      request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .send(book2)
        .end((err, res) => {
          assert.equal(res.status, 201);
          assert.equal(res.body.book.title, 'Book Two');
          assert.equal(res.body.book.author, 'Ariel J');
          assert.equal(res.body.book.categoryId, book2.categoryId);
          book2.id = res.body.book.id;
          done();
        });
    });

    // Add stock quantity
    describe('POST add stock quantyity - api/v1/books/<bookId>', () => {
      it('should respond with errors when no input field is provided', (done) => {
        request(app)
          .post('/api/v1/books/hello')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.quantity[0], 'The quantity field is required.');
            done();
          });
      });

      it('should respond with an error when book id is invalid', (done) => {
        request(app)
          .post('/api/v1/books/hello')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({ quantity: 24 })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Book id is invalid');
            done();
          });
      });

      it('should respond with errors when quantity field is invalid', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({ quantity: 'hello' })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.quantity[0], 'The quantity must be a number.');
            assert.equal(res.body.errors.quantity[1], 'The quantity must be at least 1.');
            done();
          });
      });

      it('should respond with errors when quantity is less than 1', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({ quantity: 0 })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.quantity[0], 'The quantity must be at least 1.');
            done();
          });
      });

      it('should respond an error when book does not exist', (done) => {
        request(app)
          .post('/api/v1/books/80')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({ quantity: book3.stockQuantity })
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Book not found');
            done();
          });
      });

      it('should update the stock quantity', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({ quantity: book2.stockQuantity })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.success, true);
            assert.equal(res.body.message, 'Stock quantity updated successfully');
            done();
          });
      });
    });
  });

  // Get a single book from library
  describe('GET book api/v1/books/<bookId>', () => {
    it('should respond with an error when book id is invalid', (done) => {
      request(app)
        .get('/api/v1/books/hello')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Book id is invalid');
          done();
        });
    });

    it('should respond with an error book does not exist', (done) => {
      request(app)
        .get('/api/v1/books/100')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book not found');
          done();
        });
    });

    it('should return the book', (done) => {
      request(app)
        .get(`/api/v1/books/${book2.id}`)
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book loaded successfully');
          assert.equal(res.body.book.title, book2.title);
          assert.equal(res.body.book.author, book2.author);
          done();
        });
    });
  });

  // Tests for book updates
  describe('PUT Update book /api/v1/books/:bookId', () => {
    describe('PUT update book when admin has a valid token', () => {
      it('it should respond with a 400 with please provide a valid book Id', (done) => {
        request(app)
          .put('/api/v1/books/warri')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(book3)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Book id is invalid');
            done();
          });
      });

      it('it should respond with a 422 with bad request and required validation errors', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({
            title: ' ',
            author: ' ',
            coverPic: ' '
          })
          .end((err, res) => {
            assert.equal(res.status, 422);
            assert.equal(res.body.errors.title[0], 'The title must be at least 2 characters');
            assert.equal(res.body.errors.author[0], 'The author must be at least 2 characters');
            assert.equal(res.body.errors.coverPic[0], 'The cover picture field is required.');
            done();
          });
      });

      it('should respond with an error when book category is invalid', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(invalidBooks.book2)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.categoryId[0], 'The category id must be a number.');
            done();
          });
      });

      it('should respond with an error with book does not exist', (done) => {
        request(app)
          .put('/api/v1/books/89')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(book3)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Book not found');
            done();
          });
      });

      it('should respond with an error when category does not exist', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(invalidBooks.book1)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'Category not found');
            done();
          });
      });

      it('should update the book', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send(book3)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.book.title, 'Book Three');
            assert.equal(res.body.book.author, 'Packard Bell');
            assert.equal(res.body.book.categoryId, book3.categoryId);
            done();
          });
      });
    });
  });

  after((done) => {
    models.Book.truncate();
    models.User.truncate();
    models.Category.truncate();
    done();
  });
});
