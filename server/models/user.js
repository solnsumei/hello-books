'use strict';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true,  isAlphanumumeric:true, len: [2,30]}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty: true, len: [8,255]}
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {isEmail:true}
        }
    });

    User.associate = (models) => {
        User.belongsToMany(models.Book, {as: 'borrowedBooks', through: 'UserBook', foreignKey: 'userId'});
    };

    return User;
};
