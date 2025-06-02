const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Wallet = sequelize.define('Wallet', {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        
    },
    currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Wallet;

