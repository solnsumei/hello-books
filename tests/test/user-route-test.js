// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';

// Test user sign up route
describe('User', () => {

  describe('POST /api/v1/users/signup', () => {

    describe('POST Validation Errors /api/users/signup', () => {
      it('responds with a 400 bad request for empty body', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({})
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({username: 'ejiro', email: 'hello@you', password: 'solomon1'})
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ username: '', email: 'hello@you', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: '', surname: '', username: '', email: '', password:'' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: '', surname: '', username: 'ejiro', email: 'hello@you', password: 'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Solomon', surname: 'Ejiro', username: '', email: 'hello@you', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Solomon', surname: 'Chuks', username: '', email: '', password:'' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });


      it('responds with a 400 bad request', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: '', surname: 'Ejiro', username: '', email: 'hello@you.com', password:'' })
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/, done)
      });

    });

    describe('POST Sign Up user /api/users/signup', () => {

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Chuks', surname: 'Solomon', username: 'solmei', email: 'solmei@gmail.com', password: 'solomon1' })
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(/"username":\s*"solmei"/)
          .expect(/"message":\s*"User created successfully"/, done);
      });

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Chuks', surname: 'Solomon', username: 'solmei23', email: 'solmei23@gmail.com', password: 'solomon1' })
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(/"username":\s*"solmei23"/)
          .expect(/"message":\s*"User created successfully"/, done);
      });

    });

    describe('POST Duplicate username or email /api/users/signup', () => {

      it('responds with a 400 with error message', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Chuks', surname: 'Solomon', username: 'solmei', email: 'solmei@gmail.com', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(409)
          .expect('Content-Type', /json/)
          .expect(/"username":\s*"Username has already been taken"/, done);
      });

      it('responds with a 400 with error message', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Chuks', surname: 'Solomon', username: 'ejiro234', email: 'solmei@gmail.com', password:'solomon1' })
          .set('Accept', 'application/json')
          .expect(409)
          .expect('Content-Type', /json/)
          .expect(/"email":\s*"Email has already been taken"/, done);
      });

    });

  });

  describe('POST /api/users/signin', () => {

    it('responds with a 400 status and username and password required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"username":\s*"Username is required"/)
        .expect(/"password":\s*"Password is required"/, done);
    });

    it('responds with a 400 status and password is required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solmei' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"password":\s*"Password is required"/, done);
    });

    it('responds with a 400 status with username is required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ password: 'solking' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(/"username":\s*"Username is required"/, done);
    });

    it('responds with a 401 status and user not found error', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solking24', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Username and\/or password is incorrect"/, done);
    });

    it('responds with a 401 status and wrong password', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solmei', password:'solomon' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Username and\/or password is incorrect"/, done);
    });

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solmei', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(/"username":\s*"solmei"/, done);
    });
  });

  after((done) => {
    db.User.truncate();
    done();
  });

});
