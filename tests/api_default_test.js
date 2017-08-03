// Import the required files and classes for test
import app from '../app';
import request from 'supertest';

// Test the default url route
describe('GET /', () => {
    it('it responds with a 200 status and Welcome to Hello-Books in json', (done) => {
       request(app)
           .get('/')
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(200, {message: 'Welcome to Hello-Books'}, done);
    });
});


