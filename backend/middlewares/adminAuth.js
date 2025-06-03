const {User} = require('../models/index');

exports.adminAuth = async (req, res, next) => {
    const user = req.user;
    if(user.isAdmin == false){
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

