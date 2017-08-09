// Import the required files and classes for test
import app from '../app';
import request from 'supertest';
import db from '../server/models';

// Test add book route
describe('Book Routes', () => {
  let token = null;

  const admin = {
    username: 'ejiro',
    email: 'ejiro@gmail.com',
    password: 'solking1',
    admin: true
  };

  const user = {
    username: 'solking',
    email: 'ejiro2@gmail.com',
    password: 'solking1',
    admin: false
  };

  it('responds with a 200 status and success message and user token', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({ username: 'ejiro', password:'solomon1' })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(/"message":\s*"You are logged in successfully"/, done);
  });

  describe('POST /api/books', () => {

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .post('/api/users/signin')
        .send({ username: 'ejiro', password:'solomon1' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(/"message":\s*"You are logged in successfully"/, done);
    });

    beforeEach((done) => {
      db.Book.truncate();
      done();
    });

    describe('POST without admin privileges', ()=> {
      it('responds with a 403 Access denied', (done) => {
        request(app)
          .post('/api/book')
          .send({ title: 'My Book', author: 'Andela', description:'', stockQuantity:'-1', pic:null })
          .set('Accept', 'application/json')
          .expect(403)
          .expect('Content-Type',  /json/, done)
      });

      it('responds with a 403 Access denied', (done) => {
        request(app)
          .post('/api/books')
          .send({ title: 'My Book', author: 'Andela', description:'', stockQuantity:'-1', pic:null })
          .set('Accept', 'application/json')
          .expect(403)
          .expect('Content-Type', /json/, done)
      });

      it('responds with a 403 Access denied', (done) => {
        request(app)
          .post('/api/books')
          .send({ title: 'My Book', author: 'Andela', description: 'This is the first book in the library', quantity:4, pic:'mybook.jpg' })
          .set('Accept', 'application/json')
          .expect(403)
          .expect('Content-Type', /json/, done);
      });
    });

  });

  describe('GET /api/books', () => {

    describe('GET books without being logged in', () => {
      it('it should respond with a 403 status code', (done) => {
        request(app)
          .get('/api/books')
          .set('Accept', 'application/json')
          .expect(403)
          .expect('Content-Type', /json/, done)
      });
    });

  });

});