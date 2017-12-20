const element = require('./selectors');

const {
  registerPage, profilePage,
  borrowHistory, bookDetailPage,
  catalogPage
} = element;

module.exports = {
  'Test failed user sign up':
  (browser) => {
    browser
      .url('http://localhost:8000/register')
      .waitForElementVisible('form', 1000)
      .pause(2000)
      .setValue('input[name=username]', 'chuks')
      .setValue('input[name=email]', 'eleme@gmail')
      .setValue('input[name=password]', 'solomon1')
      .setValue('input[name=firstName]', 'Solomon')
      .setValue('input[name=surname]', 'Ejiro')
      .waitForElementVisible('button[name=action]', 1000)
      .click('button[name=action]')
      .pause(2000);

    browser.expect.element(registerPage.emailLabel).to.have.attribute('data-error')
      .which.contains('The email format is invalid');

    browser.refresh();
  },
  'Test user profile actions': (browser) => {
    browser
      .url('http://localhost:8000/register')
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .setValue('input[name=username]', 'chuks')
      .setValue('input[name=email]', 'eleme@gmail.com')
      .setValue('input[name=password]', 'solomon1')
      .setValue('input[name=firstName]', 'Solomon')
      .setValue('input[name=surname]', 'Ejiro')
      .waitForElementVisible('button[name=action]', 1000)
      .click('button[name=action]')
      .pause(2000)
      .assert.containsText(profilePage.h3Title, 'Solomon Ejiro')
      .pause(1000)
      .click(profilePage.editBtn)
      .pause(1000);

    browser.expect.element('form').to.be.present.before(1000);
    browser.assert.containsText(profilePage.editFormTitle, 'Edit Profile');
    browser.expect.element('input[name=firstName]').to.have.value.that.equals('Solomon');
    browser.expect.element('input[name=surname]').to.have.value.that.equals('Ejiro');

    browser.pause(1000)
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', 'Chuks')
      .clearValue('input[name=surname]')
      .setValue('input[name=surname]', 'Solomon')
      .click(profilePage.saveButton)
      .pause(1000)
      .assert.containsText(profilePage.h3Title, 'Chuks Solomon')
      .refresh();
  },

  'Test books page and borrow action': (browser) => {
    browser
      .url('http://localhost:8000/books')
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .assert.containsText(catalogPage.h3, 'Book Catalog');
    browser.expect.element(catalogPage.firstBookImg)
      .to.have.attribute('src',
        'http://res.cloudinary.com/solmei/image/upload/v1513617506/gpprtr2al9iiaphtxbso.jpg');
    browser.assert.containsText(catalogPage.firstBookTitle, 'New Book')
      .pause(1000)
      .click(`${catalogPage.firstBookTitle} > a`)
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('div.card', 2000)
      .assert.containsText(bookDetailPage.bookTitle, 'New Book')
      .assert.containsText(bookDetailPage.actionBtn, 'BORROW')
      .pause(1000)
      .click(bookDetailPage.actionBtn)
      .assert.containsText(bookDetailPage.modalTitle, 'Confirm Borrow')
      .assert.containsText(bookDetailPage.modalText, 'Do you want to borrow this book?')
      .pause(1000)
      .click(bookDetailPage.modalConfirmBtn)
      .pause(1000)
      .assert.containsText(bookDetailPage.actionBtn, 'RETURN')
      .refresh();
  },

  'Test borrow history page and return book action': (browser) => {
    browser
      .url('http://localhost:8000/borrow-history')
      .waitForElementVisible('table', 1000)
      .pause(2000)
      .assert.containsText(borrowHistory.firstRowTitle, 'New Book')
      .assert.elementPresent(borrowHistory.returnBtn)
      .pause(1000)
      .assert.containsText(borrowHistory.returnBtn, 'RETURN')
      .assert.containsText(borrowHistory.returnTd, 'no')
      .pause(1000)
      .click(borrowHistory.returnBtn)
      .pause(1000)
      .waitForElementVisible('#modal1', 1000)
      .assert.containsText(borrowHistory.modalTitle, 'Confirm Return')
      .assert.containsText(borrowHistory.modalText, 'Do you want to return book with title New Book')
      .pause(1000)
      .click(borrowHistory.modalConfirmBtn)
      .pause(1000)
      .assert.elementNotPresent(borrowHistory.returnBtn)
      .assert.containsText(borrowHistory.returnTd, 'yes')
      .end();
  }
};
