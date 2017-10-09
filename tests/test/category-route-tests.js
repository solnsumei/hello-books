// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';
import { User, Category } from "../dataholder";

// Test add book route
describe('Category Routes', () => {
  let userToken = null;
  let adminToken = null;

  let categoryId = null;
  const category1 = new Category('Fiction', 'fiction');
  const category2 = new Category('Programming', 'programming');
  const category3 = new Category('Android', 'android');

  const admin = new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const user = new User('Solking', 'Ejiroh', 'solking', 'solking@gmail.com', 'solomon1', false);

  before((done) => {
      db.User.bulkCreate([admin, user], { individualHooks: true })
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
                  done();
                });
            });
        });
      });
  });

  describe('GET Ordinary users get categories routes  /api/v1/categories', () => {
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
          .expect(/"error":\s*"Forbidden, Admins Only"/, done);
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
          .expect(/"error":\s*"Forbidden, Admins Only"/, done);

      });
    });

    describe('POST add category when admin has a valid token', () => {
      it('it should respond with a 400 with errors', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .expect(400)
          .expect('Content-Type', /json/)
          .expect('{"error":"Category name is required"}', done);
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
          .expect(409)
          .expect('Content-Type', /json/)
          .expect(/"name":\s*"Category name has already been used"/, done);
      });
  });

});

  describe('PUT update category /api/v1/categories', () => {

    describe('POST try to add a category without being logged in', () => {
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
          .expect(/"error":\s*"Forbidden, Admins Only"/, done);

      });
    });

    describe('PUT update category when admin has a valid token', () => {
      it('it should respond with a 400 with errors', (done) => {
        request(app)
          .put(`/api/v1/categories/${categoryId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .expect(400)
          .expect('Content-Type', /json/)
          .expect('{"error":"Category name is required"}', done);
      });

      it('it should respond with a 400 with invalid category Id', (done) => {
        request(app)
          .put('/api/v1/categories/whatsup')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(category2)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"a valid category id is required"/, done);
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
          .expect(409)
          .expect('Content-Type', /json/)
          .expect(/"name":\s*"Category name has already been used"/, done);
      });
    });
  });

  after((done) => {
    db.User.truncate();
    db.Category.truncate();
    done();
  });

});
