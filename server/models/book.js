'use strict';

export default (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Title has already been entered"
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Title is required"
                },
                len:{
                    args: [2,150],
                    msg: "Title must be at least 2 chars and less than 150 chars"
                }
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Author is required"
                },
                len:{
                    args: [2,50],
                    msg: "Author must be at least 2 chars and less than 50 chars"
                }
            },
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Description is required"
                }
            },
        },
        pic: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: {
                args: true,
                msg: "Picture is already in database"
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Pic is required"
                },
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: {
                    args: 0,
                    msg: "Quantity cannot be less than 0"
                },
            },
        },
    });

    Book.associate = (models) => {
        Book.belongsToMany(models.User, {as: 'users', through: 'UserBook', foreignKey: 'bookId'});
    };

    return Book;
};
