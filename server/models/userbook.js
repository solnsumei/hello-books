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


    return UserBook;
};