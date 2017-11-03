// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../app';
import db from '../../server/models/index';
import { users, books } from '../mockData';



// Test user sign up route
describe('User', () => {
  let freeUserId = '';
  let freeUserToken = '';
  let silverUserId = '';
  let silverUserToken = '';

  const { freeUser, silverUser } = users;
  let { book1, book2, book3 } = books;

  before((done) => {
    db.Book.bulkCreate([book1, book2, book3], {})
      .then(() => {
        process.stdout.write('Test books created \n');
        request(app)
        done();
      });
  }); 
    
  // User signup test
  describe('POST /api/v1/users/signup', () => {
    describe('POST Validation Errors /api/users/signup', () => {
      it('responds with a 400 bad request for empty body', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({})
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.firstName[0], 'The firstName field is required.');
            assert.equal(res.body.errors.surname[0], 'The surname field is required.');
            assert.equal(res.body.errors.username[0], 'The username field is required.');
            assert.equal(res.body.errors.email[0], 'The email field is required.');
            assert.equal(res.body.errors.password[0], 'The password field is required.');
            done();
          });
      });

      it('responds with a 400 bad request, invalid email with firstName and surname required', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({username: 'ejiro', email: 'hello@you', password: 'solomon1'})
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.firstName[0], 'The firstName field is required.');
            assert.equal(res.body.errors.surname[0], 'The surname field is required.');
            assert.equal(res.body.errors.email[0], 'The email format is invalid.');
            done();
          });
      });

      it('responds with a 400 bad request invalid email format with other fields required', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ username: '', email: 'hello@you', password:'solomon1' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.firstName[0], 'The firstName field is required.');
            assert.equal(res.body.errors.surname[0], 'The surname field is required.');
            assert.equal(res.body.errors.username[0], 'The username field is required.');
            assert.equal(res.body.errors.email[0], 'The email format is invalid.');
            done();
          });
      });

      it('responds with a 400 bad request with all fields required', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: '', surname: '', username: '', email: '', password:'' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.errors.firstName[0], 'The firstName field is required.');
            assert.equal(res.body.errors.surname[0], 'The surname field is required.');
            assert.equal(res.body.errors.username[0], 'The username field is required.');
            assert.equal(res.body.errors.email[0], 'The email field is required.');
            assert.equal(res.body.errors.password[0], 'The password field is required.');
            done();
          });
      });

    });

    describe('POST Sign Up user /api/users/signup', () => {

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send(freeUser)
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 201);
            assert.equal(res.body.message, 'User created successfully');
            assert.equal(res.body.username, freeUser.username);
            freeUser.id = res.body.userId;
            freeUser.token = res.body.token;
            done();
          });
      });

      it('responds with a 201 with created user', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send(silverUser)
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 201);
            assert.equal(res.body.message, 'User created successfully');
            assert.equal(res.body.username, silverUser.username);
            done();
          });
      });

    });

    describe('POST Duplicate username or email /api/users/signup', () => {

      it('responds with a 409 with error message', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send(silverUser)
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 409);
            assert.equal(res.body.errors.username[0], 'Username has already been taken');
            done();
          });
      });

      it('responds with a 409 with error message', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send({ firstName: 'Chuks', surname: 'Solomon', username: 'ejiro234', email: silverUser.email, password:'solomon1' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            assert.equal(res.status, 409);
            assert.equal(res.body.errors.email[0], 'Email has already been taken');
            done();
          });
      });

    });

  });

  // User signin test
  describe('POST /api/v1/users/signin', () => {
    it('responds with a 400 status and username and password required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({})
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.username[0], 'The username field is required.');
          assert.equal(res.body.errors.password[0], 'The password field is required.');
          done();
        });
    });

    it('responds with a 400 status and password is required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solmei' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.password[0], 'The password field is required.');
          done();
        });
    });

    it('responds with a 400 status with username is required', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ password: 'solking' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.username[0], 'The username field is required.');
          done();
        });
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
        .send({ username: silverUser.username, password: silverUser.password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, `Welcome back ${silverUser.username}`);
          assert.equal(res.body.username, silverUser.username);
          silverUser.id = res.body.userId;
          silverUser.token = res.body.token;
          done();
        });
    });
  });

  // Get single user profile test
  describe('GET user profile', () => {
    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .get('/api/v1/users/userId')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'User Id is invalid');
          done();
        });
    });

    it('responds with a 401 with user is authorised', (done) => {
      request(app)
        .get(`/api/v1/users/${silverUser.id}`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'You are not authorised to perform this action');
          done();
        });
    });

    it('responds with a 200 status with user object', (done) => {
      request(app)
        .get(`/api/v1/users/${freeUser.id}`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.user.username, freeUser.username);
          assert.equal(res.body.user.email, freeUser.email);
          done();
        });
    });
  })

  // User profile update test
  describe('PUT update user profile', () => {
    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .put('/api/v1/users/profile')
        .send({})
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.firstName[0], 'The first name field is required.');
          assert.equal(res.body.errors.surname[0], 'The surname field is required.');
          assert.equal(res.body.errors.membershipType[0], 'The membership type field is required.');
          done();
        });
    });

    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .put('/api/v1/users/profile')
        .send({ firstName: 'Solomon',  surname: 'Ejiro', membershipType: 'None' })
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Membership type selected not found, please choose a valid membershipType');
          done();
        });
    });

    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .put('/api/v1/users/profile')
        .send({ firstName: 'Solomon', surname: 'Ejiro', membershipType: 'Bronze' })
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'User profile updated successfully');
          assert.equal(res.body.username, silverUser.username);
          assert.notEqual(res.body.username, silverUser.token);
          silverUser.token = res.body.token;
          done();
        });
    });
  })

  // Change user password test
  describe('POST change user password', () => {
    before((done)=> {
      request(app)
        .get('/api/v1/books')
        .set('x-token', freeUser.token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          book1 = res.body.books[0];
          book2 = res.body.books[1];
          done();
        });
    });

    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .post('/api/v1/users/change-password')
        .send({})
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.oldPassword[0], 'The oldPassword field is required.');
          assert.equal(res.body.errors.password[0], 'The password field is required.');
          done();
        });
    });

    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .post('/api/v1/users/change-password')
        .send({ oldPassword: 'solomon2', password: 'solomon1', password_confirmation: 'solomon1' })
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.oldPassword[0], 'Wrong password entered');
          done();
        });
    });

    it('responds with a 200 status and success message', (done) => {
      request(app)
        .post('/api/v1/users/change-password')
        .send({ oldPassword: 'solomon1', password: 'solomon2', password_confirmation: 'solomon2' })
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Your Password was changed successfully');
          done();
        });
    });
  })

  // Test borrow book
  describe('POST borrow book', () => {
    it('it should respond with a 400 with a valid book id is required', (done) => {
      request(app)
        .post(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'a valid book id is required');
          done();
        })
    });

    it('it should respond with a 404 with book not found', (done) => {
      request(app)
        .post(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: 100 })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book not found');
          done();
        });
    });

    it('it should respond with a 400 with invalid user Id', (done) => {
      request(app)
        .post('/api/v1/users/hello/books')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'a valid user id is required');
          done();
        })
    });

    it('it should respond with a 401 with user not authorised', (done) => {
      request(app)
        .post(`/api/v1/users/${silverUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'You are not authorised to perform this action');
          done();
        });
    });

    it('it should respond with a 200 with borrowed book', (done) => {
      request(app)
        .post(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book borrowed successfully');
          assert.equal(res.body.borrowedBook.Book.title, book1.title);
          assert.equal(res.body.borrowedBook.bookId, book1.id);
          done();
        });
    });

    it('it should respond with a 200 with borrowed book', (done) => {
      request(app)
        .post(`/api/v1/users/${silverUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book borrowed successfully');
          assert.equal(res.body.borrowedBook.Book.title, book2.title);
          assert.equal(res.body.borrowedBook.bookId, book2.id);
          done();
        });
    });

    it('it should respond with a 400 when user has exceeed the number of books they can borrow', (done) => {
      request(app)
        .post(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'You have exceeded the maximum book you can hold at a time');
          done();
        });
    });

    it('it should respond with a 400 with no copies available for borrowing', (done) => {
      request(app)
        .post(`/api/v1/users/${silverUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'No copies available for borrowing');
          done();
        });
    });

    it('it should respond with a 409 with you have already borrowed this book', (done) => {
      request(app)
        .post(`/api/v1/users/${silverUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.error, 'You already borrowed this book');
          done();
        });
    });
  });
  
  // Test return book
  describe('PUT return book', () => {
    it('it should respond with a 400 with a valid book id is required', (done) => {
      request(app)
        .put(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'a valid book id is required');
          done();
        })
    });

    it('it should respond with a 404 with book not found', (done) => {
      request(app)
        .put(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: 100 })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book not found');
          done();
        });
    });

    it('it should respond with a 400 with invalid user id', (done) => {
      request(app)
        .put('/api/v1/users/hello/books')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'a valid user id is required');
          done();
        })
    });

    it('it should respond with a 401 with user not authorised', (done) => {
      request(app)
        .put(`/api/v1/users/${silverUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.error, 'You are not authorised to perform this action');
          done();
        });
    });

    it('it should respond with a 200 with returned book', (done) => {
      request(app)
        .put(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book was returned successfully');
          assert.equal(res.body.returnedBook.Book.title, book1.title);
          assert.equal(res.body.returnedBook.bookId, book1.id);
          done();
        });
    });

    it('it should respond with a 400 with error when book has not been borrowed', (done) => {
      request(app)
        .put(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'You cannot return a book that has not been borrowed');
          done();
        });
    });

    it('it should respond with a 404 with error when user did not borrow a book', (done) => {
      request(app)
        .put(`/api/v1/users/${freeUser.id}/books`)
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book was not found in your borrowed list');
          done();
        });
    });
  });

  after((done) => {
    db.User.truncate();
    db.Book.truncate();
    done();
  });

});
