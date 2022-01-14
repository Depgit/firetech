const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const User = require('../models/User');

const varifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({error:'Access denied for token'});
    }
    try{
        jwt.verify(token, JWT_TOKEN, (err, payload) => {
            if(err){
                return res.status(401).json({error:'Access denied'});
            }
            const {_id} = payload;
            User.findById(_id).then(userdata=>{
                req.user = userdata;
            })
        });
    }catch(err){
        res.status(400).json({error:'Invalid token'});
    }
    next();
}

module.exports = varifyToken;