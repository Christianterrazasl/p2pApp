const {User, AuthToken} = require('../models/index');


exports.requireAuth = async (req, res, next) => {
    const headers = req.headers;
    const tokenString = headers.authorization;
    if(!tokenString) {
        return res.status(401).json({message: 'No token provided'});
    }
    const token = await AuthToken.findOne({where: {token: tokenString}});
    if(!token){
        return res.status(401).json({message: 'Invalid token'});
    }
    const user = await User.findOne({where: {id: token.userId}});
    if(!user){
        return res.status(401).json({message: 'Invalid token'});
    }
    req.user = user;
    console.log(user);
    
    next();
}