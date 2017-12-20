// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../server/app';
import models from '../../server/models/index';
import { User, Category } from '../classHolder';

// Test add book route
describe('Admin Membership Routes', () => {
  let adminToken = null;
  const userToken = null;

  const membershipTypeId = 2;

  const admin = new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const membershipType1 = { lendDuration: 10, maxBorrowable: 15 };

  before((done) => {
    models.User.bulkCreate([admin], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test admin created \n');
        request(app)
          .post('/api/v1/users/signin')
          .send({ username: admin.username, password: admin.password })
          .set('Accept', 'application/json')
          .end((err, res) => {
            adminToken = res.body.token;
            done();
          });
      });
  });

  describe('GET Membership types  /api/v1/membership', () => {
    it('should return a list of membership types', (done) => {
      request(app)
        .get('/api/v1/membership')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.memberships.length, 4);
          assert.equal(res.body.success, true);
          done();
        });
    });
  });

  describe('PUT update membership type - /api/v1/membership/:membershipId', () => {
    it('should respond with an error when membershipId is invalid', (done) => {
      request(app)
        .put('/api/v1/membership/hello')
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(membershipType1)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Membership id is invalid');
          done();
        });
    });

    it('should respond with errors for empty body', (done) => {
      request(app)
        .put(`/api/v1/membership/${membershipTypeId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.lendDuration[0], 'The lend duration field is required.');
          assert.equal(res.body.errors.maxBorrowable[0], 'The maximum books borrowable field is required.');
          done();
        });
    });

    it('should respond with errors when form input fields are invalid', (done) => {
      request(app)
        .put(`/api/v1/membership/${membershipTypeId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send({ lendDuration: 'hi', maxBorrowable: 'whatsup' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.lendDuration[0], 'The lend duration must be an integer.');
          assert.equal(res.body.errors.lendDuration[1], 'The lend duration must be at least 1.');
          assert.equal(res.body.errors.maxBorrowable[0], 'The maximum books borrowable must be an integer.');
          assert.equal(res.body.errors.maxBorrowable[1], 'The maximum books borrowable must be at least 1.');
          done();
        });
    });

    it('should return the updated membership type', (done) => {
      request(app)
        .put(`/api/v1/membership/${membershipTypeId}`)
        .set('Accept', 'application/json')
        .set('x-token', adminToken)
        .send(membershipType1)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.success, true);
          assert.equal(res.body.message, 'Membership type updated successfully');
          assert.equal(res.body.membership.lendDuration, '10');
          assert.equal(res.body.membership.maxBorrowable, '15');
          done();
        });
    });
  });

  after((done) => {
    models.User.truncate();
    done();
  });
});
