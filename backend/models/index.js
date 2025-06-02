const {sequelize} = require('../config/db');
const Currency = require('./currency');
const Wallet = require('./wallet');
const Transaction = require('./transaction');
const TransactionBuyDetails = require('./transactionBuyDetails');
const TransactionSellDetails = require('./transactionSellDetails');
const Post = require('./post');
const Transfer = require('./transfer');
const AuthToken = require('./authToken');
const User = require('./user');

User.hasMany(Wallet, {foreignKey: 'userId'});
Wallet.belongsTo(User, {foreignKey: 'userId'});

Wallet.hasMany(Transaction, {foreignKey: 'buyingWalletId'});
Transaction.belongsTo(Wallet, {foreignKey: 'buyingWalletId'});

Wallet.hasMany(Transaction, {foreignKey: 'sellingWalletId'});
Transaction.belongsTo(Wallet, {foreignKey: 'sellingWalletId'});

Wallet.hasMany(Transfer, {foreignKey: 'giverWalletId'});
Transfer.belongsTo(Wallet, {foreignKey: 'giverWalletId'});

Wallet.hasMany(Transfer, {foreignKey: 'receiverWalletId'});
Transfer.belongsTo(Wallet, {foreignKey: 'receiverWalletId'});

User.hasOne(AuthToken, {foreignKey: 'userId'});
AuthToken.belongsTo(User, {foreignKey: 'userId'});

Transaction.hasOne(TransactionBuyDetails, {foreignKey: 'transactionId'});
TransactionBuyDetails.belongsTo(Transaction, {foreignKey: 'transactionId'});

Transaction.hasOne(TransactionSellDetails, {foreignKey: 'transactionId'});
TransactionSellDetails.belongsTo(Transaction, {foreignKey: 'transactionId'});

Wallet.hasMany(Post, {foreignKey: 'walletId'});
Post.belongsTo(Wallet, {foreignKey: 'walletId'});

Wallet.hasMany(Transfer, {foreignKey: 'giverWalletId'});
Transfer.belongsTo(Wallet, {foreignKey: 'giverWalletId'});

Wallet.hasMany(Transfer, {foreignKey: 'receiverWalletId'});
Transfer.belongsTo(Wallet, {foreignKey: 'receiverWalletId'});

Currency.hasMany(Transaction, {foreignKey: 'currencyId'});
Transaction.belongsTo(Currency, {foreignKey: 'currencyId'});

Currency.hasMany(Transfer, {foreignKey: 'giverCurrencyId'});
Transfer.belongsTo(Currency, {foreignKey: 'giverCurrencyId'});

Currency.hasMany(Transfer, {foreignKey: 'receiverCurrencyId'});
Transfer.belongsTo(Currency, {foreignKey: 'receiverCurrencyId'});

Currency.hasMany(Post, {foreignKey: 'currencyId'});
Post.belongsTo(Currency, {foreignKey: 'currencyId'});

async function syncModels() {
    try{
        await sequelize.sync({alter: true});
        console.log("Models synced successfully");
    }
    catch(error){
        console.log("Error syncing models: ", error);
    }
}

syncModels();

module.exports = {
    Currency,
    Wallet,
    Transaction,
    TransactionBuyDetails,
    TransactionSellDetails,
    Post,
    Transfer,
    AuthToken,
    User
};
