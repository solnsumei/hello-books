// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import assert from 'assert';
import db from '../../server/models/index';
import { User, Book, Category } from "../dataholder";

// Test add book route
describe('Book Routes', () => {
  let userToken = null;
  let adminToken = null;
  let categoryId = null;
  let book1Id = null;
  let book2Id = null;

  const admin = new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const user = new User('Solmei', 'Ejiroh', 'solking', 'solking@gmail.com', 'solomon1', false);


  const category1 = new Category('Fiction', 'fiction');
  const category2 = new Category('Programming', 'programming');

  // books to insert
  const book1 = new Book('Book One', 50, 'Andela One', 'First book in library', 12, 'image1.jpg');

  // books to use
  const book2 = new Book('Book Two', 2, 'Ariel J', 'Second book in library', 4, 'image2.jpg');
  const book3 = new Book('Book Three', 6, 'Packard Bell', 'Third book in library', 3, 'image3.jpg');
  const book4 = new Book('Book Four', 2, 'Dunhill Mack', 'Four book in library', 2, 'image4.jpg');

  // invalid book 
  const invalidBook = {
    title: 'Book Invalid',
    categoryId: 'hello',
    author: 'My guy',
    description: 'Warri has come'
  }

  before((done) => {
      db.User.bulkCreate([admin, user], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test users created \n');
        db.Category.bulkCreate([category1], {})
        .then(() => {
          process.stdout.write('Test categories created \n');
          request(app)
          .post('/api/v1/users/signin')
          .send({ username: user.username, password: user.password })
          .set('Accept', 'application/json')
          .end((err, res) => {
            userToken = res.body.token;
            user.id = res.body.userId;
            request(app)
              .post('/api/v1/users/signin')
              .send({ username: admin.username, password: admin.password })
              .set('Accept', 'application/json')
              .end((err, res) => {
                adminToken = res.body.token;
                request(app)
                  .post('/api/v1/categories')
                  .send(category2)
                  .set('x-token', adminToken)
                  .set('Accept', 'application/json')
                  .end((err, res) => {
                    categoryId = res.body.category.id;
                    book2.categoryId = categoryId;
                    book3.categoryId = categoryId;
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
          .set('x-token', userToken)
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
          .set('x-token', userToken)
          .send(book3)
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Forbidden, Admins Only"/, done);

      });
    });

    describe('POST add book when admin has a valid token', () => {
      it('it should respond with a 400 with bad request errors', (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.title[0], 'The title field is required.');
            assert.equal(res.body.errors.author[0], 'The author field is required.');
            assert.equal(res.body.errors.categoryId[0], 'The book category field is required.');
            assert.equal(res.body.errors.coverPic[0], 'The cover picture field is required.');
            assert.equal(res.body.errors.stockQuantity[0], 'The stock quantity field is required.');
            done();
          });
      });

      it('it should respond with a 404 with category is not found', (done) => {
        request(app)
          .post('/api/v1/books')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(book1)
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
          .set('x-token', adminToken)
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

    describe('POST update book stockQuantity when admin has a valid token', () => {
      it('it should respond with a 400 with bad request errors', (done) => {
        request(app)
          .post('/api/v1/books/hello')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Quantity must be a number not less than 1');
            done();
          });
      });

      it('it should respond with a 400 with bad request errors', (done) => {
        request(app)
          .post('/api/v1/books/hello')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({quantity: 24})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'a valid book id is required');
            done();
          });
      });

      it('it should respond with a 400 with Quantity must be greater than one', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Quantity must be a number not less than 1');
            done();
          });
      });

      it('it should respond with a 400 with quantity must be a number not less than 1', (done) => {
        request(app)
          .post(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({quantity: 'hello'})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Quantity must be a number not less than 1');
            done();
          });
      });

      it('it should respond with a 404 with Book not found', (done) => {
        request(app)
          .post('/api/v1/books/80')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({ quantity: book4.stockQuantity })
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
          .set('x-token', adminToken)
          .send({ quantity: book4.stockQuantity })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.success, true);
            assert.equal(res.body.message, 'Stock quantity updated successfully');
            done();
          });
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
          .set('x-token', adminToken)
          .send(book3)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Please provide a valid book id');
            done();
          });
      });

      it('it should respond with a 400 with bad request errors', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.title[0], 'The title field is required.');
            assert.equal(res.body.errors.author[0], 'The author field is required.');
            assert.equal(res.body.errors.categoryId[0], 'The book category field is required.');
            assert.equal(res.body.errors.coverPic[0], 'The cover picture field is required.');
            done();
          });
      });

      it('it should respond with a 400 with book category must be an integer', (done) => {
        request(app)
          .put(`/api/v1/books/${book2.id}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(invalidBook)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.categoryId[0], 'The book category must be a number.');
            done();
          });
      });

      it('it should respond with a 404 with book not found', (done) => {
        request(app)
          .put('/api/v1/books/89')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
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
          .set('x-token', adminToken)
          .send(book1)
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
          .set('x-token', adminToken)
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
