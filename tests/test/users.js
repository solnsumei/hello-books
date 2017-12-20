// Import the required files and classes for test
import request from 'supertest';
import assert from 'assert';
import app from '../../server/app';
import models from '../../server/models/index';
import { users, booksForUserTest, booksForBookTest } from '../mocks';

// Test user sign up route
describe('User', () => {
  const { admin, freeUser, silverUser } = users;
  const { book3 } = booksForBookTest;
  let { book1, book2 } = booksForUserTest;

  before((done) => {
    models.Book.bulkCreate([book1, book2, book3], {})
      .then(() => {
        process.stdout.write('Test books created \n');

        models.User.bulkCreate([admin, silverUser], { individualHooks: true })
          .then(() => {
            process.stdout.write('Test silverUser created \n');
            done();
          });
      });
  });

  // User signup test
  describe('POST /api/v1/users/signup', () => {
    it('should respond with errors for empty input object', (done) => {
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

    it('should respond with errors when all input fields are empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({ firstName: '', surname: '', username: '', email: '', password: '' })
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

    it('should respond with error message when email field is invalid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({ username: 'chuks', email: 'hello@you', password: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.errors.email[0], 'The email format is invalid.');
          assert.equal(res.body.errors.firstName[0], 'The firstName field is required.');
          assert.equal(res.body.errors.surname[0], 'The surname field is required.');
          done();
        });
    });

    it('should create a new user', (done) => {
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

    it('should respond with an error message for duplicate username', (done) => {
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

    it('should respond with an error message for duplicate email', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({ firstName: 'Chuks', surname: 'Solomon', username: 'ejiro234', email: silverUser.email, password: 'solomon1' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.errors.email[0], 'Email has already been taken');
          done();
        });
    });
  });

  // User signin test
  describe('POST /api/v1/users/signin', () => {
    it('should respond with errors for empty input object', (done) => {
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

    it('should respond with error message when username is incorrect', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solking24', password: 'solomon1' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Username and\/or password is incorrect"/, done);
    });

    it('should respond with error message when password is incorrect', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'solmei', password: 'solomon' })
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Username and\/or password is incorrect"/, done);
    });

    it('should log the user into the application', (done) => {
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

  // Get user profile test
  describe('GET api/v1/user/profile', () => {
    it('should deny user access when no token is supplied with request', (done) => {
      request(app)
        .get('/api/v1/user/profile')
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, please log in"/, done);
    });

    it('should deny user access when token supplied is either invalid or expired', (done) => {
      request(app)
        .get('/api/v1/user/profile')
        .set('Accept', 'application/json')
        .set('x-token', 'hyssgsheejhusssy234558393')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect(/"error":\s*"Access denied, token could not be authenticated"/, done);
    });

    it('should return profile information of the user', (done) => {
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

  // User profile update test
  describe('PUT api/v1/user/profile', () => {
    it('should update user profile', (done) => {
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
  });

  // Change user password test
  describe('POST change user password', () => {
    before((done) => {
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

    it('should respond with errors for empty input', (done) => {
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

    it('should respond with errors when a wrong password is entered', (done) => {
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

    it('should not allow google users to change their password', (done) => {
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

    it('should change the user password successfully', (done) => {
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
  });

  // Test borrow book
  describe('POST api/v1/book/borrow', () => {
    it('should respond with an error message when book id is invalid', (done) => {
      request(app)
        .post('/api/v1/book/borrow')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Book id is invalid');
          done();
        });
    });

    it('should respond with an error when book does not exist', (done) => {
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

    it('should return the borrowed book', (done) => {
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

    it('should borrow the book', (done) => {
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

    it('should respond with an error when user exceeeds the number of books they can borrow', (done) => {
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

    it('should respond with an error when book is out of stock', (done) => {
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

    it('should respond with an error when user already borrowed the book', (done) => {
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
  describe('GET api/v1/user/history', () => {
    it('should return the user borrow history array', (done) => {
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
        });
    });

    it('should respond with an item when returned query parameter equals false', (done) => {
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
        });
    });

    it('should return an empty list when returned query parameter equals true', (done) => {
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
        });
    });
  });

  // Test Admin Notifications
  describe('GET admin notifications - api/v1/notifications', () => {
    let notificationId = null;

    it('should return a list of unread notifications', (done) => {
      request(app)
        .get('/api/v1/notifications')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Unread Notifications loaded successfully');
          assert.equal(res.body.notifications.count, 2);
          notificationId = res.body.notifications.rows[0].id;
          done();
        });
    });

    it('should respond with an error when notification id is invalid', (done) => {
      request(app)
        .get('/api/v1/notifications/wari')
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Notification id is invalid');
          done();
        });
    });

    it('should return the read notification item', (done) => {
      request(app)
        .get(`/api/v1/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Notification read successfully');
          assert.equal(res.body.notification.isSeen, true);
          done();
        });
    });

    it('should respond with an error when notification is not found', (done) => {
      request(app)
        .get(`/api/v1/notifications/${notificationId}`)
        .set('Accept', 'application/json')
        .set('x-token', admin.token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.error, 'Notification not found');
          done();
        });
    });
  });


  // Test return book
  describe('PUT return book - api/v1/book/return', () => {
    it('should respond with an error message when book id is invalid', (done) => {
      request(app)
        .put('/api/v1/book/return')
        .set('Accept', 'application/json')
        .set('x-token', freeUser.token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Book id is invalid');
          done();
        });
    });

    it('should respond with an error message when book does not exist', (done) => {
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

    it('should return the borrowed book', (done) => {
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

    it('should respond with an error message when book has not been borrowed', (done) => {
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

    it('should respond with an error with when user did not borrow the book', (done) => {
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
