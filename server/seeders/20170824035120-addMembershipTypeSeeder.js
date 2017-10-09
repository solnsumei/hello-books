'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MembershipTypes', [{
      membershipType: 'Gold',
      lendDuration: 30,
      maxBorrowable: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        membershipType: 'Silver',
        lendDuration: 24,
        maxBorrowable: 8,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        membershipType: 'Bronze',
        lendDuration: 14,
        maxBorrowable: 5,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        membershipType: 'Free',
        lendDuration: 7,
        maxBorrowable: 2,
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {})
      .then(() => {
      process.stdout.write('Membership types created \n');
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('MembershipTypes', null, {});
  }
};
