const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert('Users', [{
      firstName: 'Ejiro',
      surname: 'Nsumei',
      username: 'ejiro',
      password: bcrypt.hashSync('solomon1', 10),
      email: 'ejiro@gmail.com',
      admin: true,
      membershipType: 'Free',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { individualHooks: true })
      .then(() => {
        process.stdout.write('Admin user created \n');
      })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Users', null, {})
  )
};
