// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';
import user from "../../server/models/user";

// Test add book route
describe('Book Routes', () => {
  let userToken = null;
  let adminToken = null;

  const admin = {
    username: 'ejiro',
    email: 'ejiro@gmail.com',
    password: 'solomon1',
    admin: true
  };

  const user = {
    username: 'solking',
    email: 'ejiro2@gmail.com',
    password: 'solomon1',
    admin: false
  };

  before((done) => {
    db.User.bulkCreate([
      admin,
      user ], { individualHooks: true })
      .then(() => {
        return process.stdout.write('Test users created \n');
      });

    db.Book.bulkCreate([{
      title: 'Book One',
      author: 'Andela One',
      description: 'First book in library',
      stockQuantity: 12,
      coverPic: 'image.jpg'
    }, {
      title: 'Book Two',
      author: 'Ariel J',
      description: 'Second book in library',
      stockQuantity: 4,
      coverPic: 'image2.jpg'
    },{
      title: 'Book Three',
      author: 'Packard Bell',
      description: 'Third book in library',
      stockQuantity: 3,
      coverPic: 'image3.jpg'
    },{
      title: 'Book Four',
      author: 'Dunhill Mack',
      description: 'Fourth book in library',
      stockQuantity: 1,
      coverPic: 'image4.jpg'
    }], {})
      .then(() => {
        process.stdout.write('Test books created \n');
      });

    request(app)
      .post('/api/users/signin')
      .send({ username: user.username, password: user.password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('Regular users routes  /api/books', () => {

    describe('GET books without being logged in', () => {
      it('it should respond with a 403 with access denied please log in error message', (done) => {
        request(app)
          .get('/api/books')
          .set('Accept', 'application/json')
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 403 with access denied token not authenticated', (done) => {
        request(app)
          .get('/api/books')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .expect(403)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('GET books when user has a valid token', () => {
      it('it should respond with a 200 with message Books Catalog', (done) => {
        request(app)
          .get('/api/books')
          .set('Accept', 'application/json')
          .set('x-token', userToken)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(/"message":\s*"Books Catalog"/, done);
      });

    });

    // describe('POST without admin privileges', ()=> {
    //   it('responds with a 403 and Not authen ', (done) => {
    //     request(app)
    //       .post('/api/book')
    //       .send({ title: 'My Book', author: 'Andela', description:'', stockQuantity:'-1', CoverPic:null })
    //       .set('Accept', 'application/json')
    //       .set('x-token', "randomString")
    //       .expect(403)
    //       .expect('Content-Type',  /json/, done)
    //   });
    //
    //   it('responds with a 403 Access denied', (done) => {
    //     request(app)
    //       .post('/api/books')
    //       .send({ title: 'My Book', author: 'Andela', description:'', stockQuantity:'-1', CoverPic:null })
    //       .set('Accept', 'application/json')
    //       .expect(403)
    //       .expect('Content-Type', /json/, done)
    //   });
    //
    //   it('responds with a 403 Access denied', (done) => {
    //     request(app)
    //       .post('/api/books')
    //       .send({ title: 'My Book', author: 'Andela', description: 'This is the first book in the library', quantity:4, CoverPic:'mybook.jpg' })
    //       .set('Accept', 'application/json')
    //       .expect(403)
    //       .expect('Content-Type', /json/, done);
    //   });
    // });

  });

  after((done) => {
    db.User.truncate();
    db.Book.truncate();
    done();
  });

});