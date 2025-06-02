const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AuthToken = sequelize.define('AuthToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = AuthToken;
