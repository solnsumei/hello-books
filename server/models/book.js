'use strict';

export default (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        pic: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });

    Book.associate = (models) => {
        Book.belongsToMany(models.User, {as: 'users', through: 'UserBook', foreignKey: 'bookId'});
    };

    return Book;
};
