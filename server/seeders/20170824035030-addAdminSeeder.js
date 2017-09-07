'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Ejiro',
      surname: 'Nsumei',
      username: 'ejiro',
      password: bcrypt.hashSync('solomon1', 10),
      email: 'ejiro@gmail.com',
      admin: true,
      membershipType: 'Free',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {individualHooks: true})
      .then(() => {
        process.stdout.write('Admin user created \n');
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
