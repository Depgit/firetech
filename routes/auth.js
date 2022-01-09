const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/auth');

/**
 * @route POST api/users/register
 */
router.post('/register', async (req, res) => {
    const user = await new User(req.body);
    user.isAdmin = false;
    try{
        // if user already exist then error
        const userExist = await User.findOne({email: req.body.email});
        if(userExist){
            return res.status(400).send('User already exist');
        }
        await user.save();
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        res.status(201).json(user);
    }catch(err){
        res.status(400).send(err);
    }
});

/**
 * @route POST api/users/login
 */
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    try{
        if(!user){
            return res.status(404).send('User not found');
        }
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token;
        res.status(200).json(user);
    }catch(err){
        res.status(400).send(err);
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
        res.status(200).send('Logout success');
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;