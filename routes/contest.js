const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @route GET api/contest
 */

router.get('/data', async (req, res) => {
    // only data this week
    const today = new Date();
    const week = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
    const data = await Post.find({date: {$gte: week, $lt: weekEnd}}).sort({date: -1});
    try{
        res.status(201).json({data:data, created: true});
    }   
    catch(err){
        res.status(400).json({error: err});
    }
});


module.exports = router;
