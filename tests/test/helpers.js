// Import the required files and classes for test
import { assert } from 'chai';
import createToken from '../../server/helpers/createToken';
import pagination from '../../server/helpers/pagination';
import { mailOptions } from '../../server/helpers/mailHelper';

// Test functions
describe('App Functions', () => {
  describe('createToken', () => {
    it('should return null when user type is not an object', (done) => {
      const user = '';
      const token = createToken(user, true);
      assert.equal(createToken(user), null);
      done();
    });

    it('should return the created token', (done) => {
      const user = {
        username: 'me'
      };
      const token = createToken(user, true);
      assert.notEqual(createToken(user), null);
      done();
    });

    it('should return a token if token is created', (done) => {
      const user = {
        id: 2
      };
      assert.notEqual(createToken(user), null);
      done();
    });
  });

  describe('Pagination', () => {
    it('should return only the limit if page is less than one', (done) => {
      const result = pagination(0, 3);
      assert.equal(result.limit, 3);
      done();
    });

    it('should return only the limit if page is negative', (done) => {
      const result = pagination(-1, 3);
      assert.equal(result.limit, 3);
      done();
    });

    it('should return limit as 10 if limit is negative', (done) => {
      const result = pagination(-1, -2);
      assert.equal(result.limit, 10);
      done();
    });

    it('should return limit if page is 1', (done) => {
      const result = pagination(1, 3);
      assert.equal(result.limit, 3);
      done();
    });

    it('should return offset and limit if page is greater than 1', (done) => {
      const result = pagination(2, 3);
      assert.equal(result.limit, 3);
      assert.equal(result.offset, 3);
      done();
    });
  });

  describe('Mail Helper', () => {
    const user1 = {
      firstName: 'chuks',
      surname: 'ejiro',
      username: 'ikemba',
      resetToken: 'rwtwttsstyeeteyuueuej'
    };

    const book = {
      title: 'My Yam'
    };

    const text1 = `<div style="background-color:#ccc">
  <h3 style="color:#fff;background-color:#388E3C;padding:15px">Dear ${user1.firstName} ${user1.surname}</h3>
  <div style="padding:0 15px;padding-bottom:15px">
  <p>You have requested to reset your password.</p>
  <p>Please click on the link below to reset your password or copy and paste it on your browser</p>
  <p><a href="${process.env.HOST_NAME}/reset-password?toke=${user1.resetToken}">${user1.resetToken}</a></p>
  <p>Thank you</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p style="color:#388E3C">Regards: Hello Books</p>
  </div>
  </div>`;

    const text2 = `<div style="background-color:#ccc">
  <h3 style="color:#fff;background-color:#388E3C;padding:15px">Dear ${user1.firstName} ${user1.surname}</h3>
  <div style="padding:0 15px;padding-bottom:15px">
  <p>You have been surcharged for not returning <strong>${book.title}</strong> as at when due</p>
  <p>For this reason you will not be able to borrow more books from the library until you return this book.</p>
  <p>Please endeavour to return the book in order to enjoy our library services</p>
  <p>Thank you</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p style="color:#388E3C">Regards: Hello Books</p>
  </div>
  </div>`;

    it('should return reset email text if user wants to reset password', (done) => {
      const mail = mailOptions(user1, 'Forgot Password');
      assert.equal(mail.html, text1);
      done();
    });

    it('should return surcharge mail if book is provided', (done) => {
      const mail = mailOptions(user1, 'Surcharge', book);
      assert.equal(mail.html, text2);
      done();
    });
  });
});
