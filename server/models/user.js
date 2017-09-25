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
    membershipType: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Membership Type is Required'
      },
      defaultValue: 'Free',
      validate: {
        notEmpty: {
          msg: 'Membership Type is Required'
        }
      }
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  User.associate = (models) => {
    User.hasMany(models.UserBook, { as: 'userBooks', foreignKey: 'userId' });
    User.belongsToMany(models.Book, { as: 'borrowedBooks', through: 'UserBook', foreignKey: 'userId', otherKey: 'bookId' });
    User.belongsTo(models.MembershipType, { foreignKey: 'membershipType', targetKey: 'membershipType' });
  };

  return User;
};
