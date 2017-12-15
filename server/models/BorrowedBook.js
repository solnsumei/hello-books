/**
* Borrowed book model
* @param {Object} sequelize - sequelize object
* @param {Object} DataTypes - database datatypes
* 
* @return {Object} BorrowedBook model
*/
export default (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: true,
        msg: 'user id is required'
      },
      validate: {
        notEmpty: {
          msg: 'user id is required'
        },
        isNumeric: {
          msg: 'user id is invalid'
        },
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: true,
        msg: 'book id is required'
      },
      validate: {
        notEmpty: {
          msg: 'book id is required'
        },
        isNumeric: {
          msg: 'book id is invalid'
        },
      },
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'borrow date is required'
      },
      validate: {
        isDate: {
          msg: 'borrow date is invalid'
        },
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'due date is required'
      },
      validate: {
        isDate: {
          msg: 'due date is invalid'
        },
      },
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'return date is invalid'
        },
      },
    },
    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  BorrowedBook.associate = (models) => {
    BorrowedBook.belongsTo(models.Book, { as: 'book', foreignKey: 'bookId' });
    BorrowedBook.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BorrowedBook;
};
