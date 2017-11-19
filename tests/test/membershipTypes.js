// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import assert from 'assert';
import models from '../../server/models/index';
import { User, Category } from "../dataholder";

// Test add book route
describe('Admin Membership Routes', () => {
  let adminToken = null;
  let userToken = null;

  let membershipTypeId = 2;

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

  describe('GET Membership types  /api/v1/membership-types', () => {
    describe('GET membershipTypes when admin has a valid token', () => {
      it('it should respond with a 200', (done) => {
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
  });

  describe('PUT update membership type /api/v1/membership-types/:membershipId', () => {
    describe('PUT update a membership type when admin is logged in with a token', () => {
      it('it should respond with a 400 with invalid membershipTypeId', (done) => {
        request(app)
          .put('/api/v1/membership/hello')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(membershipType1).end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Membership id is invalid');
            done();
          });
      });

      it('it should respond with a 400 with errors', (done) => {
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

      it('it should respond with a 400 with error message array', (done) => {
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

      it('it should respond with a 400 with lendDuration at least 1', (done) => {
        request(app)
          .put(`/api/v1/membership/${membershipTypeId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({ lendDuration: 0, maxBorrowable: 0 })
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.lendDuration[0], 'The lend duration must be at least 1.');
            assert.equal(res.body.errors.maxBorrowable[0], 'The maximum books borrowable must be at least 1.');
            done();
          });
      });

      it('it should respond with a 200 with the updated membership type', (done) => {
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
  });

  after((done) => {
    models.User.truncate();
    done();
  });

});
