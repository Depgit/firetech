const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/auth');

/**
 * @route POST api/auth/signup
 */
router.post('/signup', async (req, res) => {
    const user = await new User(req.body);
    user.isAdmin = false;
    try{
        // if user already exist then error
        const userExist = await User.findOne({username: req.body.username});
        const emailExist = await User.findOne({email: req.body.email});
        if(userExist || emailExist){
            return res.status(400).json({error: 'User already exist'});
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        res.status(200).json({token,user});
    }catch(err){
        res.status(400).json({error:err});
    }
});

/**
 * @route POST api/auth/login
 */
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    try{
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        await user.save();
        res.json({token,user});
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
        res.json({message:'Logout success'});
    }catch(err){
        res.status(400).json({error:err});
    }
});



module.exports = router;