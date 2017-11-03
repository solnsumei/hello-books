// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import assert from 'assert';

// Test app.js
describe('App Routes', () => {

  describe('GET api/* route', () => {
    it('it should respond with a 404 with error route not found', (done) => {
      request(app)
        .get('/api/categories')
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Route not found');
          done();
        });
    });
  });

  describe('POST api/*', () => {
    it('it should respond with a 404 with route does not exist', (done) => {
      request(app)
        .post('/api/categories')
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Route does not exist');
          done();
        });
    });
  });

});
