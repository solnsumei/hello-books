// Import the required files and classes for test
import app from '../app';
import request from 'supertest';
import db from '../server/models';

// Test add book route
describe('Book Routes', () => {

    describe('GET /api/books', () => {

        it('it should respond with a 200 status code', (done) => {
            request(app)
                .get('/api/books')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/, done)
        });

    });

    describe('POST /api/books', () => {

        beforeEach((done) => {
            db.Book.truncate();
            done();
        });

        it('responds with a 404 not found', (done) => {
            request(app)
                .post('/api/book')
                .send({ title: 'My Book', author: 'Andela', description:'', quantity:'-1', pic:null })
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/, done)
        });

        it('responds with a 400 bad request', (done) => {
            request(app)
                .post('/api/books')
                .send({ title: 'My Book', author: 'Andela', description:'', quantity:'-1', pic:null })
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/, done)
        });

        it('responds with a 201 with created book model', (done) => {
            request(app)
                .post('/api/books')
                .send({ title: 'My Book', author: 'Andela', description:'This is the first book in the library', quantity:4, pic:'/images/mybook.jpg' })
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/"title":\s*"My Book"/)
                .expect(/"Author":\s*"Andela"/)
                .expect(/"quantity":\s*"4"/, done);
        });
    });

});