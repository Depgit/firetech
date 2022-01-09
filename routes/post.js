const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

/**
 * @route POST api/posts/creatememe
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.post('/creatememe', varifyToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    const post = await new Post({
        title: req.body.title,
        meme: req.body.meme,
        user : req.user._id,
    });
    try{
        await post.save();
        res.status(201).json(post);
    }catch(err){
        res.status(400).send(err);
    }
});

/**
 * @route PUT api/posts/comment/:id
 */
router.put('/comment/:id', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).send('Post not found or deleted');
    }
    const newComment = {
        text: req.body.text,
    };
    try{
        post.comments.push(newComment);
        await post.save();
        res.status(201).json(post);
    }catch(err){
        res.status(400).send(err);
    }
});

    

module.exports = router;