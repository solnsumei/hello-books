
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    surcharge: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
    },
    isSeen: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserBooks')
};
