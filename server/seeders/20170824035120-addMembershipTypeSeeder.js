'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [{
      level: 'Gold',
      lendDuration: 30,
      maxBorrowable: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        level: 'Silver',
        lendDuration: 24,
        maxBorrowable: 8,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        level: 'Bronze',
        lendDuration: 14,
        maxBorrowable: 5,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        level: 'Free',
        lendDuration: 7,
        maxBorrowable: 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {})
      .then(() => {
      process.stdout.write('Membership types created \n');
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Memberships', null, {});
  }
};
