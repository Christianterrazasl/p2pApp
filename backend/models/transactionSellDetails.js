const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const TransactionSellDetails = sequelize.define('TransactionSellDetails', {
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imgInstructionUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imgReceiptUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
},{
    freezeTableName: true,  
    timestamps: false
});

module.exports = TransactionSellDetails;