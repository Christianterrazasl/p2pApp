const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Transaction = sequelize.define('Transaction', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    buyingWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sellingWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Transaction;