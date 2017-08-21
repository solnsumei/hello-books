'use strict';
module.exports = function(sequelize, DataTypes) {
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
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Category name must contain only alphabets'
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
        msg: 'Slug is required'
      }
    }
  });

  return Category;
};