const element = require('./selectors');

const {
  registerPage, profilePage, sideLinks,
  dashboardPage, categoryPage, bookPage
} = element;

const book = {
  title: 'Title',
  author: 'Author',
  categoryId: 1,
  stockQuantity: 20,
  description: 'New book',
  coverPic: 'http://res.cloudinary.com/solmei/image/upload/v1513617506/gpprtr2al9iiaphtxbso.jpg'
};

module.exports = {
  'Test Login Failed': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('form', 1000)
      .pause(2000)
      .setValue('input[name=username]', 'chuks')
      .setValue('input[name=password]', 'eleme')
      .waitForElementVisible('button[name=action]', 1000)
      .click('button[name=action]')
      .pause(2000)
      .assert.containsText('p.red-text', '**Login failed!')
      .refresh();
  },

  'Test successful login': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .setValue('input[name=username]', 'ejiro')
      .setValue('input[name=password]', 'solomon1')
      .waitForElementVisible('button[name=action]', 1000)
      .click('button[name=action]')
      .pause(2000)
      .assert.containsText('h3.user-details', 'Ejiro Nsumei')
      .pause(1000)
      .waitForElementVisible('.side-nav', 1000)
      .click(sideLinks.dashboard)
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.containsText(dashboardPage.h3, 'Admin Dashboard')
      .assert.elementPresent('.card')
      .refresh();
  },

  'Simulate admin category actions': (browser) => {
    browser
      .url('http://localhost:8000/admin/categories')
      .waitForElementVisible('table', 1000)
      .assert.containsText(categoryPage.rowTd, 'No item found')
      .pause(1000)
      .click('.fixed-action-btn > button')
      .pause(1000)
      .waitForElementVisible('#category-modal', 1000)
      .waitForElementVisible('form', 1000)
      .assert.containsText(categoryPage.h4, 'Add Category');

    browser.expect.element('input[name=name]').to.have.value.that.equals('');

    browser.pause(1000)
      .setValue('input[name=name]', 'K')
      .pause('1000')
      .click('button[type=submit]')
      .pause(1000);

    browser.expect.element(categoryPage.label).to.have.attribute('data-error')
      .which.contains('The name must be at least 2 characters.');

    browser.pause(1000)
      .clearValue('input[name=name]')
      .pause(1000)
      .setValue('input[name=name]', 'iOS')
      .click('button[type=submit]')
      .pause(1000)
      .assert.elementPresent('table')
      .assert.containsText(categoryPage.row1Name, 'iOS')
      .pause(1000)
      .click('.fixed-action-btn > button').pause(1000)
      .clearValue('input[name=name]')
      .pause(1000)
      .setValue('input[name=name]', 'Software Development')
      .click('button[type=submit]')
      .pause(1000)
      .assert.elementPresent('table')
      .assert.containsText(categoryPage.row2Name, 'Software Development')
      .pause(1000)
      .click('#edit-cat-1')
      .waitForElementVisible('form', 1000);

    browser.expect.element('input[name=name]').to.have.value.that.equals('iOS');

    browser.pause(1000)
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'Android')
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .assert.elementPresent('table')
      .assert.containsText(categoryPage.row1Name, 'Android')
      .pause(1000)
      .click('#delete-cat-2')
      .waitForElementVisible('#modal1', 1000)
      .assert.containsText(categoryPage.deleteModalTitle, 'Confirm Delete')
      .assert.containsText(categoryPage.deleteModalText, 'Software Development')
      .pause(1000)
      .click(categoryPage.deleteButton)
      .pause(1000)
      .waitForElementVisible('table', 1000)
      .assert.containsText(categoryPage.row1Name, 'Android')
      .refresh();
  },

  'Update Book Test': (browser) => {
    browser
      .url('http://localhost:8000/admin/books/edit/1')
      .waitForElementVisible('.card', 1000)
      .waitForElementVisible('form', 1000)
      .assert.containsText(bookPage.title, 'Edit Book')
      .assert.elementPresent('button[type=submit]');

    browser.expect.element('input[name=title]').to.have.value.that.equals(book.title);
    browser.expect.element('input[name=author]').to.have.value.that.equals(book.author);
    browser.expect.element('textarea[name=description]').to.have.value.that.equals(book.description);
    browser.expect.element('img').to.have.attribute('src', book.coverPic);

    browser.pause(1000)
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'New Book')
      .clearValue('input[name=author]')
      .setValue('input[name=author]', 'Jane Doe')
      .clearValue('textarea[name=description]')
      .setValue('textarea[name=description]', 'Very good book')
      .pause('1000')
      .waitForElementVisible('button[type=submit]', 1000)
      .getLocationInView('#submit-btn')
      .submitForm('form')
      .pause(1000)
      .waitForElementVisible('table', 1000)
      .assert.containsText(bookPage.row1Title, 'New Book')
      .assert.containsText(bookPage.row1Author, 'Jane Doe')
      .pause(1000)
      .end();
  }
};
