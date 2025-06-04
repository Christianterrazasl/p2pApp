const {Wallet, Currency} = require('../models/index');


exports.getWalletsByUserId = async (req, res) => {
    try{
        const userId = req.user.id;
        const wallets = await Wallet.findAll({where: {userId}, include: {model: Currency, attributes: ['name']}});
        res.status(200).json(wallets);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error fetching wallets");
    }
}

exports.createWallet = async (req, res) => {
    try{
        const {userId, currencyId} = req.body;
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
