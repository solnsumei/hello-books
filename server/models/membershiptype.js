'use strict';
module.exports = function(sequelize, DataTypes) {
  var MembershipType = sequelize.define('MembershipType', {
    membertype: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Membership type is required'
      },
      validate: {
        notEmpty: {
          msg: 'Membership type is required'
        },
        isAlpha: {
          msg: 'Membership type must contain only alphabets'
        },
        len: {
          args: [2, 20],
          msg: 'Username must be at least 2 chars and less than 20 chars'
        }
      },
      unique: {
        args: true,
        msg: 'Membership type already exists'
      }
    },
    lendDuration: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: true,
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
        args: true,
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

  return MembershipType;

};