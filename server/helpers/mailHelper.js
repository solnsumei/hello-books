import nodemailer from 'nodemailer';

/**
   * Initialize nodemailer transport
   * for sending emails
   * 
   * @return {function} createTransport
*/
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASS
  }
});

/**
* Formats the email text to send to users
* @param {Object} user - user
* @param {string} context - context
* @param {Object} book - optional book for borrow defaulters
* 
* @return {string} Html
*/
const mailText = (user, context, book = null) => {
  if (context === 'Forgot Password') {
    return `<h3>Dear ${user.firstName} ${user.surname}</h3>
    <p>You have requested to reset your password.</p>
    <p>Please click on the link below to reset your password or copy and paste it on your browser</p>
    <p><a href="${process.env.HOST_NAME}/reset-password?token=${user.resetToken}">${user.resetToken}</a></p>
    <p>Thank you</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Regards: Hello Books</p>`;
  }
  return `<h3>Dear ${user.firstName} ${user.surname}</h3>
    <p>You have been surcharged for not returning <strong>${book.title}</strong> as at when due</p>
    <p>For this reason you will not be able to borrow more books from the library until you return this book.</p>
    <p>Please endeavour to return the book in order to enjoy our library services</p>
    <p>Thank you</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Regards: Hello Books</p>`;
};

/**
* Sets up the mail parameters
* @param {Object} user - user
* @param {string} context - context
* @param {Object} book - optional book for borrow defaulters
* 
* @return {Object} with data of rom, to, subject and html
*/
const mailOptions = (user, context, book = null) => ({
  from: `Hello Books <${process.env.MAIL_USERNAME}>`,
  to: user.email,
  subject: context,
  html: mailText(user, context, book)
});

export { transport, mailOptions };
