// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';
import { User, Category } from "../dataholder";

// Test add book route
describe('Admin Membership Routes', () => {
  let adminToken = null;

  let membershipTypeId = 2;

  const admin = new User('Ejiro', 'Chuks', 'ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const membershipType1 = { lendDuration: 10, maxBorrowable: 15 };

  before((done) => {
      db.User.bulkCreate([admin], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test admin created \n');
        request(app)
          .post('/api/v1/users/signin')
          .send({ username: admin.username, password: admin.password })
          .set('Accept', 'application/json')
          .end((err, res) => {
            adminToken = res.body.token;
            done();
          });
      });
  });

  describe('GET Membership types  /api/v1/membershiptypes', () => {
    describe('GET membershipTypes when admin has a valid token', () => {
      it('it should respond with a 200', (done) => {
        request(app)
          .get('/api/v1/membershiptypes')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .expect(200)
          .expect('Content-Type', /json/, done);
      });
    });
  });

  describe('PUT update membership type /api/v1/membershiptype/:membershipId', () => {
    describe('PUT update a membership type when admin is logged in with a token', () => {
      it('it should respond with a 400 with invalid category Id', (done) => {
        request(app)
          .put('/api/v1/membershiptypes/hello')
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(membershipType1)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect('{"error": "Please provide a valid membership type id"}', done);
      });

      it('it should respond with a 400 with errors', (done) => {
        request(app)
          .put(`/api/v1/membershiptypes/${membershipTypeId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({})
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"maxBorrowable":\s*"Max-borrowable is required"/)
          .expect(/"lendDuration":\s*"Lend-duration is required"/, done);
      });

      it('it should respond with a 400 with parse errors', (done) => {
        request(app)
          .put(`/api/v1/membershiptypes/${membershipTypeId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send({ lendDuration: 'hi', maxBorrowable: 'whatsup' })
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(/"maxBorrowable":\s*"Max-borrowable must be a number"/)
          .expect(/"lendDuration":\s*"Lend-duration must be a number"/, done);
      });

      it('it should respond with a 200 with the category name', (done) => {
        request(app)
          .put(`/api/v1/membershiptypes/${membershipTypeId}`)
          .set('Accept', 'application/json')
          .set('x-token', adminToken)
          .send(membershipType1)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(/"lendDuration":\s*"10"/)
          .expect(/"maxBorrowable":\s*"15"/, done);
      });
    });
  });

  after((done) => {
    db.User.truncate();
    done();
  });

});
