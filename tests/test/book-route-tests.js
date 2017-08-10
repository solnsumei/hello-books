// Import the required files and classes for test
import app from '../../app';
import request from 'supertest';
import db from '../../server/models/index';
import User from "../test-data/user";
import Book from "../test-data/book";

// Test add book route
describe('Book Routes', () => {
  let userToken = null;
  let adminToken = null;

  const admin = new User('ejiro', 'ejiro@gmail.com', 'solomon1', true);
  const user = new User('solking', 'solking@gmail.com', 'solomon1', false);

  const book1 = new Book('Book One', 'Andela One', 'First book in library', 12, 'image1.jpg');
  const book2 = new Book('Book Two', 'Ariel J', 'Second book in library', 4, 'image2.jpg');
  const book3 = new Book('Book Three', 'Packard Bell', 'Third book in library', 3, 'image3.jpg');
  const book4 = new Book('Book Four', 'Dunhill Mack', 'Four book in library', 1, 'image4.jpg');

  before((done) => {
      db.User.bulkCreate([admin, user], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test users created \n');
        db.Book.bulkCreate([book1, book2, book3, book4], {})
          .then(() => {
            process.stdout.write('Test books created \n');
              request(app)
              .post('/api/users/signin')
              .send({ username: user.username, password: user.password })
              .set('Accept', 'application/json')
              .end((err, res) => {
                userToken = res.body.token;
                done();
              });
          });
      });
  });

  describe('GET Ordinary users get books routes  /api/books', () => {
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