module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('MembershipTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      membershipType: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      lendDuration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxBorrowable: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('MembershipTypes');
  }
};
