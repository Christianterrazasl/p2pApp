const {User, AuthToken} = require('../models/index');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        if(username.trim()=="" || password.trim()==""){
            return res.status(400).json({message: 'Username and password are required'});
        }
        const existingUser = await User.findOne({where: {username}});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        res.status(201).json({message: 'User registered successfully', username: user.username});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;
    try{
        if(username.trim()=="" || password.trim()==""){
            return res.status(400).json({message: 'Username and password are required'});
        }
        const user = await User.findOne({where: {username}});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid password'});
        }
        const existingToken = await AuthToken.findOne({where: {userId: user.id}});
        if(existingToken){
            await existingToken.destroy();
        }
        const generatedToken = generateToken(user.id);
        const authToken = await AuthToken.create({userId: user.id, token: generatedToken});
        const userData = user.toJSON();
        delete userData.password;
        res.status(200).json({token: authToken.token, user: userData});
    }
    catch(error){
        return res.status(500).send("Error logging in")
    }
}

exports.logoutUser = async (req, res) => {
    const user = req.body.user;
    const authToken = await AuthToken.findOne({where: {userId: user.id}});
    if(authToken){
        await authToken.destroy();
    }
    res.status(200).send({message: 'User logged out successfully'});
}


exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}


exports.getUserByToken = async (req, res) => {
    const token = req.body.token;
    const authToken = await AuthToken.findOne({where: {token}});
    if(!authToken){
        return res.status(401).json({message: 'Invalid token'});
    }
    const user = await User.findOne({where: {id: authToken.userId}});
    return res.status(200).json(user);
}

exports.registerAdmin = async (req, res) => {
    const {username, password} = req.body;
    try {
        if(username.trim()=="" || password.trim()==""){
            return res.status(400).json({message: 'Username and password are required'});
        }
        const existingUser = await User.findOne({where: {username}});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword , isAdmin: true});
        res.status(201).json({message: 'Admin registered successfully', username: user.username});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
