const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;

const varifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return res.status(401).send('Access denied');
    }
    try{
        const verified = jwt.verify(token, JWT_TOKEN);
        req.user = verified;
    }catch(err){
        res.status(400).send('Invalid token');
    }
    return next();
}

module.exports = varifyToken;