module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    coverPic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    borrowedQuantity:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stockQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isBorrowed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books')
};
