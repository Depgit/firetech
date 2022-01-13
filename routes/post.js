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
        res.status(201).json({post:post});
    }catch(err){
        res.status(400).json({error:err});
    }
});

/**
 * @route PUT api/posts/comment/:id
 */
router.put('/comment/:id', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({error:'Post not found or deleted'});
    }
    const newComment = {
        text: req.body.text,
        commentedBy: req.user._id,
    };
    try{
        post.comments.push(newComment);
        await post.save();
        res.status(201).json({post:post});
    }catch(err){
        res.status(400).json({error:err});
    }
});

/**
 * @route DELETE api/posts/deletecomment/:userId&:postId
 */
router.delete('/deletecomment/:userId&:postId', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if(!post){
        return res.status(404).json({error:'Post not found or deleted'});
    }
    const comment = post.comments.find(comment => comment.commentedBy === req.params.userId);
    if(!comment){
        return res.status(404).json({error:'Comment not found or deleted'});
    }
    try{
        const index = post.comments.indexOf(comment);
        post.comments.splice(index,1);
        await post.save();
        res.status(200).json({post:post});
    }catch(err){
        res.status(400).json({error:err});
    }
});

module.exports = router;