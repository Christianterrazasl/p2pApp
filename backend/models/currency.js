const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Currency = sequelize.define('Currency', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    usdValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Currency;