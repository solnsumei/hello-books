import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'First name is required'
      },
      validate: {
        notEmpty: {
          msg: 'First name is required'
        },
        isAlphanumeric: {
          msg: 'First name must be alphanumeric'
        },
        len: {
          args: [2, 30],
          msg: 'first Name must be at least 2 chars and less than 30 chars'
        }
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Surname is required'
      },
      validate: {
        notEmpty: {
          msg: 'Surname is required'
        },
        isAlphanumeric: {
          msg: 'Surname must be alphanumeric'
        },
        len: {
          args: [2, 30],
          msg: 'Surname must be at least 2 chars and less than 30 chars'
        }
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username is required'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        isAlphanumeric: {
          msg: 'Username must me alphanumeric'
        },
        len: {
          args: [2, 30],
          msg: 'Username must be at least 2 chars and less than 30 chars'
        }
      },
      unique: {
        args: true,
        msg: 'Username has already been taken'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email is required'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Email is invalid'
        }
      },
      unique: {
        args: true,
        msg: 'Email has already been taken'
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Password is required'
      },
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 chars'
        }
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 'Free',
      allowNull: {
        args: false,
        msg: 'Level is required'
      },
      validate: {
        notEmpty: {
          msg: 'Level is required'
        },
        len: {
          args: [2, 20],
          msg: 'Level must be at least 2 characters'
        },
      }
    },
  });

  User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  User.associate = (models) => {
    User.hasMany(models.BorrowedBook, { as: 'borrowedBooks', foreignKey: 'userId' });
    User.belongsTo(models.Membership, { as: 'membership', foreignKey: 'level', targetKey: 'level' });
  };

  return User;
};
