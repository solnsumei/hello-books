// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../server/app';
import models from '../../server/models/index';
import { User, Book, Category } from '../classHolder';

// Test add book route
describe('Category Routes', () => {
  let userToken = null;
  let adminToken = null;

  let categoryId = null;
  const category1 = new Category('Fiction', 'fiction');
  const category2 = new Category('Programming', 'programming');
  const category3 = new Category('Android', 'android');
  const category4 = new Category('A', 'a');

  const admin = new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const user = new User('Solking', 'Ejiroh', 'solking', 'solking@gmail.com', 'solomon1', false);

  // book to insert
  const book1 = new Book('Book One', 80, 'Andela One', 'First book in library', 12, 'image1.jpg');

  before((done) => {
    models.User.bulkCreate([admin, user], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test users created \n');
        request(app)
          .post('/api/v1/users/signin')
          .send({ username: user.username, password: user.password })
          .set('Accept', 'application/json')
          .end((err, res) => {
            userToken = res.body.token;
            request(app)
              .post('/api/v1/users/signin')
              .send({ username: admin.username, password: admin.password })
              .set('Accept', 'application/json')
              .end((err, res) => {
                adminToken = res.body.token;
                request(app)
                  .post('/api/v1/categories')
                  .set('Accept', 'application/json')
                  .set('x-token', adminToken)
                  .send(category3)
                  .end((err, res) => {
                    categoryId = res.body.category.id;
                    book1.categoryId = categoryId;
                    request(app)
                      .post('/api/v1/books')
                      .set('Accept', 'application/json')
                      .set('x-token', adminToken)
                      .send(book1)
                      .end((err, res) => {
                        process.stdout.write('Test book added \n');
                        done();
                      });
                  });
              });
          });
      });
  });

  describe('GET categories /api/v1/categories', () => {
    it('should respond with an error when user is unauthenticated', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should respond when token is invalid or expired', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should return a list of categories', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', userToken)
        .expect(200)
        .expect('Content-Type', /json/, done);
    });

    it('should return a list of categories', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .expect(200)
        .expect('Content-Type', /json/, done);
    });
  });

  describe('POST Add category /api/v1/categories', () => {
    it('should respond with an error when user is unauthenticated', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .send(category1)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should respond when token is invalid or expired', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .send(category1)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should respond with an error when user is not an admin', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', userToken)
        .send(category1)
        .expect(403)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Forbidden, admins only"/, done);
    });

    it('should respond with an error when category field is empty', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.name[0], 'The name field is required.');
          done();
        });
    });

    it('should respond with an error when category name is less than 2 chars', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category4)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.name[0], 'The name must be at least 2 characters.');
          done();
        });
    });

    it('should create the category', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category1)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(/"name":\s*"Fiction"/, done);
    });

    it('should respond with an error for duplicate category name', (done) => {
      request(app)
        .post('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category1)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.errors.name[0], 'Category name has already been used');
          done();
        });
    });
  });

  describe('PUT update category /api/v1/categories', () => {
    it('should respond with an error when no authentication is provided', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .send(category1)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should respond with an error when token is invalid', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .send(category1)
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should respond with an error when ordinary users tries to access the admin area', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', userToken)
        .send(category1)
        .expect(403)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Forbidden, admins only"/, done);
    });

    it('should respond with an error when category Id is invalid', (done) => {
      request(app)
        .put('/api/v1/categories/whatsup')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category2)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Category id is invalid"/, done);
    });

    it('should respond with an error when category does not exist', (done) => {
      request(app)
        .put('/api/v1/categories/24')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category2)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Category not found"/, done);
    });

    it('should respond with an error when category name is less than 2 chars', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category4)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.name[0], 'The name must be at least 2 characters.');
          done();
        });
    });

    it('should update the category', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category2)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(/"message":\s*"Category updated successfully"/)
        .expect(/"name":\s*"Programming"/, done);
    });

    it('should respond with an error for duplicate category name', (done) => {
      request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(category1)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.errors.name[0], 'Category name has already been used');
          done();
        });
    });
  });

  describe('DELETE category /api/v1/categories', () => {
    it('should respond with an error when category id is invalid', (done) => {
      request(app)
        .delete('/api/v1/categories/hello')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Category id is invalid');
          done();
        });
    });

    it('should respond with an error when books are grouped under category', (done) => {
      request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.error,
            'This category still has books attached to it so cannot be deleted at this time');
          models.Book.truncate();
          done();
        });
    });

    it('should delete the category', (done) => {
      request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send({ categoryId })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.success, true);
          assert.equal(res.body.message, 'Category was deleted successfully');
          done();
        });
    });

    it('should respond with an error when category does not exist', (done) => {
      request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Category not found');
          done();
        });
    });
  });

  after((done) => {
    models.User.truncate();
    models.Category.truncate();
    done();
  });
});
