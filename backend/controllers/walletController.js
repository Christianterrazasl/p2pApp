const {Wallet, Currency, Transaction, Transfer, User} = require('../models/index');


exports.getWalletsByUserId = async (req, res) => {
    try{
        const userId = req.user.id;
        const wallets = await Wallet.findAll({where: {userId}, include: {model: Currency, attributes: ['name', 'symbol']}});
        res.status(200).json(wallets);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error fetching wallets");
    }
}

exports.createWallet = async (req, res) => {
    try{
        const userId = req.user.id;
        const {currencyId} = req.body;
        const existingWallet = await Wallet.findOne({where: {userId, currencyId}});
        if(existingWallet){
            return res.status(400).json({message: "Wallet already exists"});
        }
        const wallet = await Wallet.create({userId, balance: 0, currencyId});
        res.status(201).json(wallet);
    }
    catch(error){
        res.status(500).send("Error creating wallet");
    }
}

exports.getWalletById = async (req, res) => {
    try{
        const {id} = req.params;
        const wallet = await Wallet.findByPk(id, 
            {include: [
            {
              model: Currency,
              attributes: ['name']
            },
            {
              model: Transaction,
              attributes: ['amount', 'type', 'date']
            },
            {
              model: Transfer,
              attributes: ['amount', 'date']
            }
          ]});
        if(!wallet){
            return res.status(404).json({message: "Wallet not found"});
        }
        const userId = req.user.id;
        if(wallet.userId !== userId){
            return res.status(403).json({message: "Unauthorized"});
        }
        res.status(200).json(wallet);
    }
    catch(error){
        res.status(500).send("Error fetching wallet");
    }
}

exports.updateBalance = async (req, res) => {
    try{
        const {walletId, balance} = req.body;
        const wallet = await Wallet.findByPk(walletId);
        if(!wallet){
            return res.status(404).json({message: "Wallet not found"});
        }
        wallet.balance = balance;
        await wallet.save();
        res.status(200).json(wallet);
    }
    catch(error){
        res.status(500).send("Error updating balance");
    }
}

exports.transfer = async (req, res) => {
    try{
        const {senderWalletId, recieverUsername, amount, targetCurrencyId} = req.body;
        const senderWallet = await Wallet.findByPk(senderWalletId);
        if(amount <= 0){
            return res.status(400).json({message: "Amount must be greater than 0"});
        }
        if(!senderWallet){
            return res.status(404).json({message: "Sender wallet not found"});
        }
        const recieverUser = await User.findOne({where: {username: recieverUsername}});
        if(!recieverUser){
            return res.status(404).json({message: "Reciever user not found"});
        }
        let recieverWallet = await Wallet.findOne({where: {userId: recieverUser.id, currencyId: targetCurrencyId}});
        if(!recieverWallet){
            recieverWallet = await Wallet.create({userId: recieverUser.id, balance: 0, currencyId: targetCurrencyId});
        }
        if(senderWallet.balance < amount){
            return res.status(400).json({message: "Insufficient balance"});
        }
        const senderWalletCurrency = await Currency.findByPk(senderWallet.currencyId);
        const recieverWalletCurrency = await Currency.findByPk(recieverWallet.currencyId);
        senderWallet.balance -= amount;
        const valueInUSD = amount * senderWalletCurrency.usdValue;
        const valueInTargetCurrency = valueInUSD / recieverWalletCurrency.usdValue;
        recieverWallet.balance += valueInTargetCurrency;
        await senderWallet.save();
        await recieverWallet.save();
        res.status(200).json({message: "Transfer successful", senderWallet, recieverWallet});
    }
    catch(error){
        res.status(500).send("Error transferring money");
    }
}
