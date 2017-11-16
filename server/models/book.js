export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'The title field is required.'
      },
      validate: {
        notEmpty: {
          msg: 'The title field is required.'
        },
        len: {
          args: [2, 150],
          msg: 'The title must be at least 2 characters'
        }
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'The category id field is required.'
      },
      validate: {
        notEmpty: {
          msg: 'The category id field is required.'
        },
        isNumeric: {
          msg: 'The category id must be a number.'
        }
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'The author field is required.'
      },
      validate: {
        notEmpty: {
          msg: 'The author field is required.'
        },
        len: {
          args: [2, 50],
          msg: 'The author must be at least 2 characters'
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'The description field is required.'
      },
      validate: {
        notEmpty: {
          msg: 'The description field is required.'
        }
      },
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'The cover picture field is required.'
      },
      validate: {
        notEmpty: {
          msg: 'The cover picture field is required.'
        },
      },
    },
    borrowedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: {
          msg: 'Quantity must be numeric'
        },
        min: {
          args: 1,
          msg: 'Quantity cannot be less than 1'
        },
      },
    },
    isBorrowed: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
  });

  Book.addScope('active', {
    where: { isDeleted: false }
  });

  Book.addScope('borrowed', {
    where: { isBorrowed: true }
  });

  Book.addScope('intact', {
    where: { isBorrowed: false }
  });

  Book.associate = (models) => {
    Book.hasMany(models.BorrowedBook, { as: 'borrowedBooks', foreignKey: 'bookId' });
    Book.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' });
  };

  return Book;
};
