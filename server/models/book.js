export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Title is required'
      },
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        len: {
          args: [2, 150],
          msg: 'Title must be at least 2 chars and less than 150 chars'
        }
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Book category is required'
      },
      validate: {
        notEmpty: {
          msg: 'Book category is required'
        },
        isNumeric: {
          msg: 'Book category must me numeric'
        }
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Author is required'
      },
      validate: {
        notEmpty: {
          msg: 'Author is required'
        },
        len: {
          args: [2, 50],
          msg: 'Author must be at least 2 chars and less than 50 chars'
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Description is required'
      },
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      },
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Cover picture is required'
      },
      unique: {
        args: true,
        msg: 'Cover picture already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Cover picture is required'
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
    Book.hasMany(models.UserBook, { as: 'borrowedBooks', foreignKey: 'bookId' });
    Book.belongsToMany(models.User, { as: 'borrowers', through: 'UserBook', foreignKey: 'bookId', otherKey: 'userId' });
    Book.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return Book;
};
