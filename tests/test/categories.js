// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import assert from 'assert';
import models from '../../server/models/index';
import { User, Book, Category } from "../dataholder";

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

  describe('GET Ordinary users categories routes  /api/v1/categories', () => {
    describe('GET categories without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .get('/api/v1/categories')
          .set('Accept', 'application/json')
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .get('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('GET categories when user has a valid token', () => {
      it('it should respond with a 403 with forbidden admins only', (done) => {
        request(app)
          .get('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', userToken)
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Forbidden, admins only"/, done);
      });

    });

    describe('GET categories when admin has a valid token', () => {
      it('it should respond with a 200', (done) => {
        request(app)
          .get('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .expect(200)
          .expect('Content-Type', /json/, done);
      });
    });
  });

  describe('POST Add category /api/v1/categories', () => {
    describe('POST try to add a category without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .send(category1)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .send(category1)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('POST add category when ordinary user has a valid token', () => {
      it('it should respond with a 403 with error message access denied, admins only', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', userToken)
          .send(category1)
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Forbidden, admins only"/, done);

      });
    });

    describe('POST add category when admin has a valid token', () => {
      it('it should respond with a 400 with errors', (done) => {
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

      it('it should respond with a 400 with category name length error', (done) => {
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

      it('it should respond with a 201 with the category name', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(category1)
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(/"name":\s*"Fiction"/, done);
      });

      it('it should respond with a 409 with duplicate category name error', (done) => {
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
  });

  describe('PUT update category /api/v1/categories', () => {

    describe('PUT try to update a category without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .put(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .send(category1)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .put(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .send(category1)
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('PUT update category when ordinary user has a valid token', () => {
      it('it should respond with a 403 with error message access denied, admins only', (done) => {
        request(app)
          .put(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .set('x-token', userToken)
          .send(category1)
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Forbidden, admins only"/, done);

      });
    });

    describe('PUT update category when admin has a valid token', () => {
      it('it should respond with a 400 with invalid category Id', (done) => {
        request(app)
          .put('/api/v1/categories/whatsup')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(category2)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Category id is invalid"/, done);
      });

      it('it should respond with a 400 with duplicate category name error', (done) => {
        request(app)
          .put('/api/v1/categories/24')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(category2)
          .expect(404)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Category not found"/, done);
      });

      it('it should respond with a 400 with category name length error', (done) => {
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

      it('it should respond with a 200 with the category name', (done) => {
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

      it('it should respond with a 409 with duplicate category name error', (done) => {
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

  });

  describe('DELETE category /api/v1/categories', () => {
        
    describe('Delete category when admin has an invalid categoryId', () => {
      it('it should respond with a 400 with invalid category Id', (done) => {
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
    });

    describe('Delete category when admin has a valid categoryId but category has books attached', () => {
      it('it should respond with a 409 with category has books', (done) => {
        request(app)
          .delete(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .end((err, res) => {
            assert.equal(res.status, 409);
            assert.equal(res.body.error, 'This category still has books attached to it so cannot be deleted at this time');
            models.Book.truncate();
            done();
          });
      });
    });

    describe('Delete category when admin has a valid categoryId', () => {
      it('it should respond with a 200 with message', (done) => {
        request(app)
          .delete(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({ categoryId: categoryId })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.success, true);
            assert.equal(res.body.message, 'Category was deleted successfully');
            done();
          });
      });
    });

    describe('Delete category when admin tries to delete an unavailable category', () => {
      it('it should respond with a 404 with error category not found', (done) => {
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
    
  });

  after((done) => {
    models.User.truncate();
    models.Category.truncate();
    done();
  });

});
