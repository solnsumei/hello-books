// Import the required files and classes for test
import app from '../app';
import request from 'supertest';
import db from '../server/models';

// Test user sign up route
describe('POST /api/users/signup', () => {

    beforeEach((done) => {
        db.User.truncate();
        done();
    });

    it('responds with a 400 bad request', (done) => {
        request(app)
            .post('/api/users')
            .send({ username: 'ejiro', email: 'hello@you', password:'solomon1' })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/, done)
    });

    it('responds with a 201 with created user', (done) => {
        request(app)
            .post('/api/users')
            .send({ username: 'ejiro', email: 'ejiro@gmail.com', password:'solomon1' })
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(/"username":\s*"ejiro"/)
            .expect(/"password":\s*"solomon1"/)
            .expect(/"email":\s*"ejiro@gmail.com"/, done);
    });
});