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
      type: DataTypes.STRING(1234),
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
    pic: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Pic is required'
      },
      unique: {
        args: true,
        msg: 'Picture is already in database'
      },
      validate: {
        notEmpty: {
          msg: 'Pic is required'
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: {
          msg: 'Quantity must be numeric'
        },
        min: {
          args: 1,
          msg: 'Quantity cannot be less than 0'
        },
      },
    },
    isBorrowed: DataTypes.BOOLEAN
  });

  Book.associate = (models) => {
    Book.hasMany(models.UserBook, {as: 'borrowedBooks', foreignKey: 'bookId' });
    Book.belongsToMany(models.User, {as: 'borrowers', through: 'UserBook', foreignKey: 'bookId', otherKey: 'userId'});
  };

  return Book;
};
