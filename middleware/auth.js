const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const User = require('../models/User');

const varifyToken = async (req, res, next) => {
    const token = req.header('x-access-token') || req.body.token || req.query.token;
    if(!token) return res.status(401).json({error: 'No token, authorization denied'});
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        const user = await User.findOne({_id: decoded._id});
        if(!user) return res.status(401).json({error: 'Token is not valid'});
        req.user = user;
        next();
    } catch(err) {
        res.status(401).json({error: 'Token is not valid'});
    }
}


module.exports = varifyToken;