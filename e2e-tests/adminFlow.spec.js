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
  'Test Admin actions': (browser) => {
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
      .end();
  }
};
