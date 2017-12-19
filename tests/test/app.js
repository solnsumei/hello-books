// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../server/app';

// Test app.js
describe('App Routes', () => {
  describe('GET api/* route', () => {
    it('should respond with a 404 error when tryoing to get a route that does not exist',
      (done) => {
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
    it('should respond with a 404 when post route does not exist', (done) => {
      request(app)
        .post('/api/categories')
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Route not found');
          done();
        });
    });
  });
});
