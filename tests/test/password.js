// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import createToken from '../../server/helpers/createToken';
import app from '../../server/app';
import models from '../../server/models/index';
import { users, booksForUserTest } from '../mocks';


// Test user trying to reset password
describe('Password Reset Controller', () => {
  const { freeUser, silverUser } = users;

  before((done) => {
    models.User.bulkCreate([freeUser, silverUser], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test silverUser created \n');
        done();
      });
  });

  // Forgot password test
  describe('POST /api/v1/users/forgot-password', () => {
    it('should respond with errors for empty body object', (done) => {
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

    it('should respond with an error when an invalid username or email is entered', (done) => {
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

    it('should respond with an error message for google users trying to reset their password', (done) => {
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

  // Reset password test
  describe('POST /api/v1/users/reset-password', () => {
    it('should respond with errors for empty body object', (done) => {
      request(app)
        .post('/api/v1/users/reset-password')
        .send({})
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.password[0], 'The password field is required.');
          done();
        });
    });

    it('should respond with errors when passwords do not match', (done) => {
      request(app)
        .post('/api/v1/users/reset-password')
        .send({ password: 'solomon1', password_confirmation: 'solomon' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.password[0], 'The password confirmation does not match.');
          done();
        });
    });

    it('should respond with an error when token is invalid', (done) => {
      request(app)
        .post('/api/v1/users/reset-password')
        .send({ password: 'solomon1', password_confirmation: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Reset token is invalid');
          done();
        });
    });

    it('should respond with an error when token is invalid', (done) => {
      request(app)
        .post('/api/v1/users/reset-password?token=hysyssggshshsjsuishhss')
        .send({ password: 'solomon1', password_confirmation: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'Reset token is invalid');
          done();
        });
    });

    it('should respond with an error when token is invalid', (done) => {
      const token = createToken({ username: 'solking' }, true);
      request(app)
        .post(`/api/v1/users/reset-password?token=${token}`)
        .send({ password: 'solomon1', password_confirmation: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'Reset token is invalid');
          done();
        });
    });
  });

  after((done) => {
    models.User.truncate();
    done();
  });
});
