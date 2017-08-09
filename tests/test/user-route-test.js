// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';

// Test user sign up route
describe('User', () => {

  describe('POST /api/users/signup', () => {

    describe('POST Validation Errors /api/users/signup', () => {

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({username: 'ejiro', email: 'hello@you', password: 'solomon1'})
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({ username: '', email: 'hello@you', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({ username: '', email: '', password:'' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({ username: '', email: 'hello@you.com', password:'' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

    });

    describe('POST Sign Up user /api/users/signup', () => {

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({username: 'solmei', email: 'solmei@gmail.com', password: 'solomon1'})
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(/"username":\s*"solmei"/)
          .expect(/"email":\s*"solmei@gmail.com"/, done);
      });

    });

    describe('POST Duplicate username or email /api/users/signup', () => {

      it('responds with a 400 with error message', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({ username: 'solmei', email: 'solmei@gmail.com', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"message":\s*"Username has already been taken"/, done);
      });

      it('responds with a 400 with error message', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({ username: 'ejiro234', email: 'solmei@gmail.com', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"message":\s*"Email has already been taken"/, done);
      });

    });

  });

  describe('POST /api/users/signin', () => {

    it('responds with a 401 status and user not found error', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'solking24', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"User not found"/, done);
    });

    it('responds with a 401 status and wrong password', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'solmei', password:'solomon' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Password is incorrect"/, done);
    });

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'solmei', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(/"username":\s*"solmei"/)
        .expect(/"message":\s*"You are logged in successfully"/, done);
    });
  });

  after((done) => {
    db.User.truncate();
    done();
  });

});