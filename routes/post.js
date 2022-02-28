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
    console.log("req.body>> ",req.body);
    const post = await new Post({
        username : req.user.username,
        title: req.body.title,
        meme: req.body.url,
    });
    console.log(req.user);
    console.log("post>>1 ", post);
    try {
        console.log("post>>2 ", post);
        await post.save();
        console.log("post>>3 ", post);
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
        res.json(posts);
    }catch(err){
        res.status(400).json({error: err});
    }   
});

/**
 * @route PUT api/posts/comment/:id
 */
router.put('/comment/create/:id', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id).select({_id: 1});
    if (!post) {
        return res.status(404).json({error:'Post not found or deleted'});
    }
    const newComment = {
        username: req.user.username,
        comment: req.body.comment,
        postId: req.params.id,
    };
    try{
        await Comment.save(newComment);
        res.status(201).json({created: true});
    }catch(err){
        res.status(400).json({error: err, created: false});
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

router.get("/post/allposts", async (req, res) => {
    const posts = await Post.find().sort({date: -1});
    res.json(posts);
})


module.exports = router;