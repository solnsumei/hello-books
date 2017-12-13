// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../app';
import models from '../../server/models/index';
import { users, booksForUserTest } from '../mockData';



// Test user sign up route
describe('User', () => {
  
  const { admin, freeUser, silverUser } = users;
  let { book1, book2, book3 } = booksForUserTest;

  before((done) => {
    models.Book.bulkCreate([book1, book2, book3], {})
      .then(() => {
        process.stdout.write('Test books created \n');

        models.User.bulkCreate([admin, silverUser], { individualHooks: true })
        .then(( )=> {
          process.stdout.write('Test silverUser created \n');
          done();
        });
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
            assert.equal(res.body.user.username, freeUser.username);
            freeUser.id = res.body.user.id;
            freeUser.token = res.body.token;
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
          assert.equal(res.body.user.username, silverUser.username);
          silverUser.id = res.body.userId;
          silverUser.token = res.body.token;
          done();
        });
    });
  });

  // Get single user profile test
  describe('GET user profile', () => {
    describe('GET when a user wants to access his profile without being logged in', () => {
      it('it should respond with a 401 with access denied please log in error message', (done) => {
        request(app)
          .get('/api/v1/user/profile')
          .set('Accept', 'application/json')
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, please log in"/, done);
      });

      it('it should respond with a 401 with access denied token not authenticated', (done) => {
        request(app)
          .get('/api/v1/user/profile')
          .set('Accept', 'application/json')
          .set('x-token', "hyssgsheejhusssy234558393")
          .expect(401)
          .expect('Content-Type', /json/)
          .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
      });

    });

    describe('GET when a user wants to access his profile wwith a valid token', () => {
      it('responds with a 200 status with user object', (done) => {
        request(app)
          .get('/api/v1/user/profile')
          .set('Accept', 'application/json')
          .set('x-token', freeUser.token)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.user.username, freeUser.username);
            assert.equal(res.body.user.email, freeUser.email);
            done();
          });
      });
    });
  })

  // User profile update test
  describe('PUT update user profile', () => {
    it('responds with a 200 status and success message and user token', (done) => {
      request(app)
        .put('/api/v1/user/profile')
        .send({ firstName: 'Solomon', surname: 'Ejiro' })
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'User profile updated successfully');
          assert.equal(res.body.user.username, silverUser.username);
          assert.equal(res.body.user.firstName, 'Solomon');
          assert.notEqual(res.body.user.firstName, silverUser.firstName);
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
          book1 = res.body.books.rows[0];
          book2 = res.body.books.rows[1];

          request(app)
            .post('/api/v1/users/signin')
            .send({ username: admin.username, password: admin.password })
            .set('Accept', 'application/json')
            .end((err, res) => {
              admin.token = res.body.token;
              done();
            });
        });
    });

    it('responds with a 400 status with all fields are required', (done) => {
      request(app)
        .post('/api/v1/user/change-password')
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

    it('responds with a 400 status with wrong password entered', (done) => {
      request(app)
        .post('/api/v1/user/change-password')
        .send({ oldPassword: 'solomon2', password: 'solomon1', password_confirmation: 'solomon1' })
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.oldPassword[0], 'Wrong password entered');
          done();
        });
    });

    it('responds with a 409 status and error message for google users', (done) => {
      request(app)
        .post('/api/v1/user/change-password')
        .send({ oldPassword: 'solomon1', password: 'solomon2', password_confirmation: 'solomon2' })
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.error, 'You are logged in through google so cannot change your password');
          done();
        });
    });

    it('responds with a 200 status and success message', (done) => {
      request(app)
        .post('/api/v1/user/change-password')
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
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Book id is invalid');
          done();
        })
    });

    it('it should respond with a 404 with book not found', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: 100 })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book not found');
          done();
        });
    });

    it('it should respond with a 200 with borrowed book', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book borrowed successfully');
          assert.equal(res.body.borrowedBook.book.title, book1.title);
          assert.equal(res.body.borrowedBook.bookId, book1.id);
          done();
        });
    });

    it('it should respond with a 200 with borrowed book', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book borrowed successfully');
          assert.equal(res.body.borrowedBook.book.title, book2.title);
          assert.equal(res.body.borrowedBook.bookId, book2.id);
          done();
        });
    });

    it('it should respond with a 400 when user has exceeed the number of books they can borrow', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book2.id })
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.error, 'You have exceeded the maximum book you can hold at a time');
          done();
        });
    });

    it('it should respond with a 400 with no copies available for borrowing', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', silverUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'No copies available for borrowing');
          done();
        });
    });

    it('it should respond with a 409 with you have already borrowed this book', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
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

  // Test borrow history
  describe('GET user borrrow history', () => {
    it('it should respond with a 200 with borrow history when the default route is visited', (done) => {
      request(app)
        .get('/api/v1/user/history')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Borrow history loaded successfully');
          assert.equal(res.body.borrowedBooks.count, 1);
          done();
        })
    });

    it('it should respond with a 200 with one item when returned equals false', (done) => {
      request(app)
        .get('/api/v1/user/history?returned=false')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Borrow history loaded successfully');
          assert.equal(res.body.borrowedBooks.count, 1);
          done();
        })
    });

    it('it should respond with a 200 with empty list when returned equals true', (done) => {
      request(app)
        .get('/api/v1/user/history?returned=true')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Borrow history loaded successfully');
          assert.equal(res.body.borrowedBooks.count, 0);
          done();
        })
    });
  });

  // Test Admin Notifications
  describe('GET admin notifications', () => {
    let notificationId = null;
    
    it('it should respond with a 200 with a list of unread notifications', (done) => {
      request(app)
        .get('/api/v1/notifications')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Unread Notifications loaded successfully')
          assert.equal(res.body.notifications.count, 2);
          notificationId = res.body.notifications.rows[0].id;
          done();
        })
    });

    it('it should respond with a 400 with notification id is invalid', (done) => {
      request(app)
        .get('/api/v1/notifications/wari')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Notification id is invalid')
          done();
        })
    });

    it('it should respond with a 200 with notification read', (done) => {
      request(app)
        .get(`/api/v1/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Notification read successfully')
          assert.equal(res.body.notification.isSeen, true);
          done();
        })
    });

    it('it should respond with a 404 with notification not found', (done) => {
      request(app)
        .get(`/api/v1/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Notification not found')
          done();
        })
    });
  });


  // Test return book
  describe('PUT return book', () => {
    it('it should respond with a 400 with book id is invalid', (done) => {
      request(app)
        .put('/api/v1/book/return')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Book id is invalid');
          done();
        })
    });

    it('it should respond with a 404 with book not found', (done) => {
      request(app)
        .put('/api/v1/book/return')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: 100 })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Book not found');
          done();
        });
    });

    it('it should respond with a 200 with returned book', (done) => {
      request(app)
        .put('/api/v1/book/return')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({ bookId: book1.id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Book was returned successfully');
          assert.equal(res.body.returnedBook.book.title, book1.title);
          assert.equal(res.body.returnedBook.bookId, book1.id);
          done();
        });
    });

    it('it should respond with a 400 with error when book has not been borrowed', (done) => {
      request(app)
        .put('/api/v1/book/return')
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
        .put('/api/v1/book/return')
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
    models.User.truncate();
    models.Book.truncate();
    done();
  });

});
