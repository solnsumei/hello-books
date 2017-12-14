const element = require('./selectors');

const registerPage = element.registerPage;
const profilePage = element.profilePage;

module.exports = {
  'Test Sign up failed': (browser) => {
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
  'Test User Actions': (browser) => {
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
      .end();
  }
};
