export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Category name is required'
      },
      validate: {
        notEmpty: {
          msg: 'Category name is required'
        },
        len: {
          args: [2, 30],
          msg: 'Category name must be at least 2 chars and less than 30 chars'
        }
      },
      unique: {
        args: true,
        msg: 'Category name has already been used'
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Category is required'
      },
      unique: {
        args: true,
        msg: 'Category name has already been used'
      }
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Book, { as: 'books', foreignKey: 'categoryId' });
  };

  return Category;
};
