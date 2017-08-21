export default (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: true,
        msg: 'User Id is required'
      },
      validate: {
        notEmpty: {
          msg: 'User Id is required'
        },
        isNumeric: {
          msg: 'User Id is invalid'
        },
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: true,
        msg: 'Book Id is required'
      },
      validate: {
        notEmpty: {
          msg: 'Book Id is required'
        },
        isNumeric: {
          msg: 'Book Id is invalid'
        },
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Due Date is required'
      },
      validate: {
        isDate: {
          msg: 'Date is invalid'
        },
      },
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    surcharge: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isDecimal: {
          msg: 'Surcharge must be a number'
        },
        min: {
          args: 0.1,
          msg: 'Surcharge cannot be less than 0.1'
        },
      },
    },
  }, {
    scopes: {
      notReturned: userId => ({
        where: {
          userId,
          returned: false
        }
      })
    }
  });

  UserBook.associate = (models) => {
    UserBook.belongsTo(models.Book, { foreignKey: 'bookId' });
    UserBook.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return UserBook;
};
