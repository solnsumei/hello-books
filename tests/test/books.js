// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import assert from 'assert';
import db from '../../server/models/index';
import { users, booksForBookTest, categoriesForBooksTest, invalidBooks } from "../mockData";

// Test add book route
describe('Book Routes', () => {
  const { freeUser, admin } = users;

  let { book1, book2, book3 } = booksForBookTest;
  const { category1, category2 } = categoriesForBooksTest;

  before((done) => {
      db.User.bulkCreate([freeUser, admin], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test users created \n');
        db.Category.bulkCreate([category1], {})
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
                    book2.categoryId = book3.categoryId = category2.id = res.body.category.id;
                    done();
                  });
              });
          });
        });
      });
  });

  describe('GET Ordinary users get books routes  /api/v1/books', () => {
    describe('GET books without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .get('/api/v1/books')
          .set('Accept', 'application/json')
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .get('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('GET books when user has a valid token', () => {
      it('it should respond with a 200 with books', (done) => {
        request(app)
          .get('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', freeUser.token)
          .expect(200)
          .expect('Content-Type', /json/, done);
      });

    });

  });

  describe('POST Add book /api/v1/books', () => {
    describe('POST try to add books without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .send(book1)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .send(book2)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('POST add book when ordinary user has a valid token', () => {
      it('it should respond with a 403 with error message access denied, admins only', (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', freeUser.token)
          .send(book3)
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Forbidden, admins only"/, done);

      });
    });

    describe('POST add book when admin has a valid token', () => {
      it('it should respond with a 400 with bad request errors', (done) => {
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

      it('it should respond with a 404 with category is not found', (done) => {
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

      it('it should respond with a 201 with created book', (done) => {
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

    });

    // Add stock quantity
    describe('POST update book stockQuantity when admin has a valid token', () => {
      it('it should respond with a 400 with bad request errors', (done) => {
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

      it('it should respond with a 400 with bad request errors', (done) => {
        request(app)
          .post('/api/v1/books/hello')
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({quantity: 24})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Book id is invalid');
            done();
          });
      });

      it('it should respond with a 400 with quantity field must be a number and at least 1', (done) => {
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

      it('it should respond with a 400 with quantity must be a number not less than 1', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', admin.token)
          .send({quantity: 0})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.quantity[0], 'The quantity must be at least 1.');
            done();
          });
      });

      it('it should respond with a 404 with Book not found', (done) => {
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

      it('it should respond with a 200 with success message', (done) => {
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
  describe('GET book', () => {
    it('it should respond with a 400 when book id is invalid', (done) => {
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

    it('it should respond with a 404 with book not found', (done) => {
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

    it('it should respond with a 200 with book', (done) => {
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
            console.log(res.body);
            assert.equal(res.status, 422);
            assert.equal(res.body.errors.title[0], 'The title must be at least 2 characters');
            assert.equal(res.body.errors.author[0], 'The author must be at least 2 characters');
            assert.equal(res.body.errors.coverPic[0], 'The cover picture field is required.');
            done();
          });
      });

      it('it should respond with a 400 with book category must be an integer', (done) => {
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

      it('it should respond with a 404 with book not found', (done) => {
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

      it('it should respond with a 404 with category not found', (done) => {
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

      it('it should respond with a 200 with updated book', (done) => {
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
    db.Book.truncate();
    db.User.truncate();
    db.Category.truncate();
    done();
  });

});
