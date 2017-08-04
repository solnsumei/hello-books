'use strict';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Username is required"
                },
                isAlphanumeric:{
                    args: true,
                    msg: "Username must me alphanumeric"
                },
                len:{
                    args: [2,30],
                    msg: "Username must be at least 2 chars and less than 30 chars"
                }
            },
            unique:{
                args: true,
                msg: 'Username has already been taken'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Password is required"
                },
                len:{
                    args: [8,255],
                    msg: "Password must be at least 8 chars"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email is required"
                },
                isEmail:{
                    args: true,
                    msg: "Email is invalid"
                }
            },
            unique:{
                args: true,
                msg: 'Email has already been taken'
            },
        },

        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Book, {as: 'borrowedBooks', through: 'UserBook', foreignKey: 'userId'});
    };

    return User;
};
