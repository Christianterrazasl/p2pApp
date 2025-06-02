const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Transfer = sequelize.define('Transfer', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    giverCurrencyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    giverWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverCurrencyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    },{
        freezeTableName: true,  
        timestamps: false
    })

module.exports = Transfer;