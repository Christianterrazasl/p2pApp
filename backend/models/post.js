const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Post = sequelize.define('Post', {
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    walletId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgInstructionUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName: true,
    timeStamps: false
});

module.exports = Post;