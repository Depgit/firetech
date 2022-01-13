const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/auth');

/**
 * @route POST api/auth/register
 */
router.post('/register', async (req, res) => {
    const user = await new User(req.body);
    user.isAdmin = false;
    try{
        // if user already exist then error
        const userExist = await User.findOne({email: req.body.email});
        if(userExist){
            return res.status(400).json({error:'User already exist'});
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        res.status(201).json({message:"User created successfully", token: token});
    }catch(err){
        res.status(400).json(err);
    }
});

/**
 * @route POST api/auth/login
 */
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    try{
        if(!user){
            return res.status(404).send({error:'User not found'});
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        res.status(200).json({message:"login successfully",user: user, token: token});
    }catch(err){
        res.status(400).json({error: err});
    }
});

/**
 * @router POST api/auth/logout
 */
router.post('/logout', varifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    try{
        user.token = '';
        await user.save();
        res.status(200).json({message:'Logout success'});
    }catch(err){
        res.status(400).json({error:err});
    }
});



module.exports = router;