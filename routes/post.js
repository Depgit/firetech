const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * @route POST api/posts/creatememe
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.post('/create/post', varifyToken, async (req, res) => {
    const post = await new Post({
        title: req.body.title,
        meme: req.body.meme,
        username : req.user.username,
    });
    try {
        await post.save();
        res.status(201).json({created: true});
    }catch(err){
        res.status(400).json({error: err, created: false});
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
        res.status(200).json({message: 'Liked Post'});
    } catch {
        res.status(400).json({error: err, message: "got an error"});
    }
});

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