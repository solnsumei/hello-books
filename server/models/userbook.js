'use strict';

export default (sequelize, DataTypes) => {
    const UserBook = sequelize.define('UserBook', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        returned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    UserBook.associate = (models) => {
        UserBook.belongsTo(models.Book);
        UserBook.belongsTo(models.User);
    };

    return UserBook;
};