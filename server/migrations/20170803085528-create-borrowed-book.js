
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BorrowedBooks', {
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
    borrowDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    returned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSeen: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('BorrowedBooks')
};
