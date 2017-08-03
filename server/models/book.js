'use strict';

export default (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: true, len: [3,255]}
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false,
            validate: {notEmpty: true, len: [8,1000]}
        },
        pic: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {notEmpty: true}
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {notEmpty: true, min:0}
        },
    });

    Book.associate = (models) => {
        Book.belongsToMany(models.User, {as: 'users', through: 'UserBook', foreignKey: 'bookId'});
    };

    return Book;
};
