const {Currency} = require('../models/index');

exports.getAllCurrencies = async (req, res) => {
    try{
        const currencies = await Currency.findAll();
        res.status(200).json(currencies);
    }catch(error){
        return res.status(500).send("Error fetching currencies");
    }
}

exports.createCurrency = async (req, res) =>{
    try{
        const {name, symbol, usdValue} = req.body;
        const existingCurrency = await Currency.findOne({where: {name}});
        if(existingCurrency){
            return res.status(400).json({message: "Currency with that name exists"});
        }
        const currency = await Currency.create({name, symbol, usdValue});
        res.status(201).json(currency);
    }catch(error){
        return res.status(500).send("Error creating currency");
    }
}

exports.deleteCurrency = async (req, res) => {
    try{
        const {id} = req.params;
        await Currency.destroy({where: {id}});
        res.status(200).json({message: "Currency deleted"});
    }catch(error){
        return res.status(500).send("Error deleting currency");
    }
}

exports.updateCurrency = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, symbol, usdValue} = req.body;
        await Currency.update({name, symbol, usdValue}, {where: {id}});
        res.status(200).json({message: "Currency updated"});
    }catch(error){
        return res.status(500).send("Error updating currency");
    }
}