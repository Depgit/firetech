const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @route POST api/posts/createpost
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.post('/createpost', varifyToken, async (req, res) => {
    const post = await new Post({
        username : req.user.username,
        title: req.body.title,
        meme: req.body.url,
    });
    try { 
        await post.save();
        res.status(201).json({post:post, created: true});
    }catch(err){
        res.status(400).json({error: err, created: false});
    }
});

/**
 * @route GET api/posts/allposts
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.get('/allposts', async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.status(201).json({posts:posts, created: true});
    }catch(err){
        res.status(400).json({error: err});
    }   
});

/**
 * @route GET api/posts/mypost
 */
router.get('/mypost', varifyToken, async (req, res) => {
    try {
        const posts = await Post.find({username: req.user.username}).sort({date: -1});
        res.status(201).json({posts:posts, created: true});
    }catch(err){
        res.status(400).json({error: err});
    }
});

/**
 * @route GET api/posts/post/:username
 */
router.get('/post/:username', async (req, res) => {
    try {
        // all post of username
        const posts = await Post.find({username: req.params.username}).sort({date: -1});        
        
        res.status(201).json({posts:posts, created: true});
    }catch(err){
        res.status(400).json({error: err});
    }
});

router.get('/postid/:id', async (req, res) => {
    try {
        // all post of username
        const posts = await Post.findOne({_id: req.params.id}).sort({date: -1});        
        
        res.status(201).json({posts:posts, created: true});
    }catch(err){
        res.status(400).json({error: err});
    }
});



/**
 * @route PUT api/posts/comment/create/:id
 */
router.post('/comment/create/:id', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id).select({_id: 1});
    if (!post) {
        return res.status(404).json({error:'Post not found or deleted'});
    }
    
    const newComment = new Comment({
        username: req.user.username,
        comment: req.body.comment,
        postId: req.params.id,
    });
    try{
        await newComment.save();
        res.status(201).json({created: true});
    }catch(err){
        res.status(400).json({error: err, created: false});
    }
});

/**
 * @route GET api/posts/comment/:id
 */
router.get('/comment/:id', async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id}).sort({date: -1});
        res.status(201).json({comments:comments, created: true});
    }catch(err){
        res.status(400).json({error: err});
    }
});

router.put('/comment/like/:id', varifyToken, async(req, res) => {
    await Comment.updateOne({_id: req.params.id}, 
        { $addToSet : { likes: req.user.username }
    }, { useFindAndModify: false });
    const result = await Comment.findById(req.params.id).select({username: 1});
    await User.updateOne({username: result.username},
        { $inc: { rating: 1 } }, { useFindAndModify: false });
    res.status(200).json({message: 'Liked Comment'});
})

router.put('/post/like/:id', varifyToken, async(req, res) => {
    try {
        await Post.updateOne({_id: req.params.id}, 
            { $addToSet : { likes: req.user.username }
        }, { useFindAndModify: false });
        const result = await Post.findById(req.params.id).select({username: 1});
        await User.updateOne({username: result.username},
        { $inc: { rating: 3 } }, { useFindAndModify: false });
        res.status(200).json({message: 'Liked Post'});
    } catch {
        res.status(400).json({error: err, message: "got an error"});
    }
});

router.get('/comment/dislike/:id', varifyToken, async(req, res) => {
    await Comment.updateOne({_id: req.params.id}, 
        { $push : { dislikes : req.user.username }
    }, { useFindAndModify: false });
    const result = await Comment.findById(req.params.id).select({username: 1});
    await User.updateOne({username: result.username},
        { $inc: { rating: -1 } }, { useFindAndModify: false });
    res.status(200).json({message: 'Disliked Comment'});
})

router.get('/post/dislike/:id', varifyToken, async(req, res) => {
    await Post.updateOne({_id: req.params.id}, 
        { $push : { dislikes : req.user.username }
    }, { useFindAndModify: false });
    const result = await Post.findById(req.params.id).select({username: 1});
    await User.updateOne({username: result.username},
        { $inc: { rating: -3 } }, { useFindAndModify: false });
    res.status(200).json({message: 'Disliked Post'});
})

router.delete("/post/delete/:id", varifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId: req.params.id});
        res.status(200).json({message: 'Post deleted'});
    } catch {
        res.status(400).json({error: err, message: "got an error"});
    }
});



module.exports = router;