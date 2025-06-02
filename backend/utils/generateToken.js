module.exports = function generateToken(userId){
    const token = userId.toString(36) + Math.random().toString(36).substring(2, 15);
    return token;
}