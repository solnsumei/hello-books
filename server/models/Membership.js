export default (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    level: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'The level field is required'
      },
      validate: {
        notEmpty: {
          msg: 'The level field is required'
        },
        isAlpha: {
          msg: 'The level field must contain only alphabets'
        },
        len: {
          args: [2, 20],
          msg: 'The level field must be at least 2 chars and less than 20 chars'
        }
      },
      unique: {
        args: true,
        msg: 'The level with this name already exists'
      }
    },
    lendDuration: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Lending duration is required'
      },
      validate: {
        notEmpty: {
          msg: 'Lending duration is required'
        },
        min: {
          args: 1,
          msg: 'Lending duration must be at least 1 day'
        },
        isNumeric: {
          msg: 'Lending duration must be a number'
        }
      }
    },
    maxBorrowable: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Maximum Borrowable is required'
      },
      validate: {
        notEmpty: {
          msg: 'Maximum Borrowable is required'
        },
        min: {
          args: 1,
          msg: 'Maximum Borrowable must be at least 1'
        },
        isNumeric: {
          msg: 'Maximum Borrowable must be a number'
        }
      }
    }
  });

  Membership.associate = (models) => {
    Membership.hasMany(models.User, { as: 'users', foreignKey: 'level', targetKey: 'level' });
  };

  return Membership;
};
