// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../app';
import models from '../../server/models/index';
import { users, booksForUserTest } from '../mockData';



// Test user sign up route
describe('Password Reset Controller', () => {

  const { freeUser, silverUser } = users;

  before((done) => {
    models.User.bulkCreate([freeUser, silverUser], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test silverUser created \n');
        done();
      });
  });

  // User signup test
  describe('POST /api/v1/users/forgotPassword', () => {
    describe('POST Validation Errors /api/users/forgot-password', () => {
      it('responds with a 400 bad request for empty body', (done) => {
        request(app)
          .post('/api/v1/users/forgot-password')
          .send({})
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.entry[0], 'Entry field is required');
            done();
          });
      });

      it('responds with a 404 no user with this email or username found', (done) => {
        request(app)
          .post('/api/v1/users/forgot-password')
          .send({ entry: 'ebele' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.error, 'No user with this email or username found');
            done();
          });
      });

      it('responds with a 409 for google users', (done) => {
        request(app)
          .post('/api/v1/users/forgot-password')
          .send({ entry: silverUser.username })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 409);
            assert.equal(res.body.error, 'Please use the google login button');
            done();
          });
      });

    });

    describe('POST Forgot password success /api/users/forgot-password', () => {

      it('responds with a 200 for successful entry', (done) => {
        request(app)
          .post('/api/v1/users/forgot-password')
          .send({ entry: freeUser.username })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, 'Reset message has been sent to your registered email.');
            done();
          });
      });
    });
  })

  after((done) => {
    models.User.truncate();
    done();
  });

});
