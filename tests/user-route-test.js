// Import the required files and classes for test
import app from '../app';
import request from 'supertest';
import db from '../server/models';

// Test user sign up route
describe('User', () => {

  let token = null;

  describe('POST /api/users/signup', () => {

    describe('POST regular user signup /api/users/signup', () => {

      beforeEach((done) => {
        db.User.truncate();
        done();
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({username: 'ejiro', email: 'hello@you', password: 'solomon1'})
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/users/signup')
          .send({username: 'ejiro', email: 'ejiro@gmail.com', password: 'solomon1'})
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(/"username":\s*"ejiro"/)
          .expect(/"email":\s*"ejiro@gmail.com"/, done);
      });

    });

    beforeEach((done) => {
      db.User.truncate();
      done();
    });

    it('responds with a 400 bad request', (done) => {
      request(app)
        .post('/api/users/signup')
        .send({ username: 'ejiro', email: 'hello@you', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/, done)
    });

    it('responds with a 201 with created user', (done) => {
      request(app)
        .post('/api/users/signup')
        .send({ username: 'ejiro', email: 'ejiro@gmail.com', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(/"username":\s*"ejiro"/)
        .expect(/"email":\s*"ejiro@gmail.com"/, done);
    });

    it('responds with a 400 with error message', (done) => {
      request(app)
        .post('/api/users/signup')
        .send({ username: 'ejiro', email: 'ejiro@gmail.com', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"message":\s*"Username has already been taken"/, done);
    });

    it('responds with a 400 with error message', (done) => {
      request(app)
        .post('/api/users/signup')
        .send({ username: 'ejiro234', email: 'ejiro@gmail.com', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"message":\s*"Email has already been taken"/, done);
    });

  });

  describe('POST /api/users/signin', () => {

    it('responds with a 401 status and user not found error', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'solking', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"User not found"/, done);
    });

    it('responds with a 401 status and wrong password', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'ejiro', password:'solomon' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Password is incorrect"/, done);
    });

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'ejiro', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(/"message":\s*"You are logged in successfully"/, done);
    });
  });

});