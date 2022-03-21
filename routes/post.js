const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { cloudinary } = require('../middleware/cloudinary')

/**
 * @route POST api/posts/createpost
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.post('/createpost', varifyToken, async (req, res) => {

    try {
        
        const memeUrl = req.body.url;
        const uploadResponse = await cloudinary.uploader.upload(memeUrl, {
            upload_preset: 'drpzet'
        })
        
        let urlImage = uploadResponse.url;
        
        let tmp = urlImage.split("upload");
        urlImage = tmp[0] + "upload/w_300,h_200,c_scale"+tmp[1];
        
        const post = await new Post({
            username: req.user.username,
            title: req.body.title,
            meme: urlImage,
        });
        
        await post.save();
        await User.updateOne({ username: req.user.username },
            { $inc: { contributions : 1 } }, { useFindAndModify: false });
        res.status(201).json({ post: post, created: true });
    } catch (err) {
        res.status(400).json({ error: err, created: false });
    }
});


/**
 * @route GET api/posts/allposts
 * @example https://i.ibb.co/wrZCs78/image.png
 */
router.get('/allposts', async (req, res) => {
    try {
        let _limit = req.headers.limit;
        let _offset = req.headers.skip;
        const posts = await Post.find().sort({ date: -1 });
        res.status(201).json({ posts: posts, created: true });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

/**
 * @route GET api/posts/mypost
 */
router.get('/mypost', varifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ username: req.user.username }).sort({ date: -1 });
        res.status(201).json({ posts: posts, created: true });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

/**
 * @route GET api/posts/post/:username
 */
router.get('/post/:username', async (req, res) => {
    try {
        // all post of username
        const posts = await Post.find({ username: req.params.username }).sort({ date: -1 });

        res.status(201).json({ posts: posts, created: true });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.get('/postid/:id', async (req, res) => {
    try {
        // all post of username
        const posts = await Post.findOne({ _id: req.params.id }).sort({ date: -1 });

        res.status(201).json({ posts: posts, created: true });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});



/**
 * @route PUT api/posts/comment/create/:id
 */
router.post('/comment/create/:id', varifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id).select({ _id: 1 });
    if (!post) {
        return res.status(404).json({ error: 'Post not found or deleted' });
    }

    const newComment = new Comment({
        username: req.user.username,
        comment: req.body.comment,
        postId: req.params.id,
    });
    try {
        await newComment.save();
        res.status(201).json({ created: true });
    } catch (err) {
        res.status(400).json({ error: err, created: false });
    }
});

/**
 * @route GET api/posts/comment/:id
 */
router.get('/comment/:id', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).sort({ date: -1 });
        res.status(201).json({ comments: comments, created: true });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.put('/comment/like/:id', varifyToken, async (req, res) => {
    try {
        const checkdisLike = await Comment.findOne({ _id: req.params.id, dislikes: { $in: [req.user.username] } });
        const likeUser = await Comment.findOne({ _id: req.params.id});
        if (checkdisLike) {
            return res.status(400).json({ error: 'You already dislike this comment' });
        } else {
            await Comment.updateOne({ _id: req.params.id },
                {
                    $addToSet: { likes: req.user.username }
                }, { useFindAndModify: false });
            await User.updateOne({ username: likeUser.username },
                { $inc: { rating: 1 } }, { useFindAndModify: false });
            res.status(200).json({ message: 'liked Comment' });
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
})

router.put('/post/like/:id', varifyToken, async (req, res) => {
    try {
        const checkDislike = await Post.findById(req.params.id).select({ dislikes: 1 });
        const likeUser = await Post.findById(req.params.id);
        if (checkDislike.dislikes.includes(req.user.username)) {
            res.status(400).json({ error: 'You already disliked this post' });
        } else {
            await Post.updateOne({ _id: req.params.id },
                {
                    $addToSet: { likes: req.user.username }
                }, { useFindAndModify: false });
            await User.updateOne({ username: likeUser.username },
                { $inc: { rating: 1 } }, { useFindAndModify: false });
            res.status(200).json({ message: 'Liked Post' });
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.put('/comment/dislike/:id', varifyToken, async (req, res) => {
    try {
        const checkLike = await Comment.findOne({ _id: req.params.id, likes: { $in: [req.user.username] } });
        const dislikeUser = await Comment.findOne({ _id: req.params.id });
        if (checkLike) {
            return res.status(400).json({ error: 'You already like this comment' });
        } else {
            await Comment.updateOne({ _id: req.params.id },
                {
                    $addToSet: { dislikes: req.user.username }
                }, { useFindAndModify: false });
            await User.updateOne({ username: dislikeUser.username },
                { $inc: { rating: -1 } }, { useFindAndModify: false });
            res.status(200).json({ message: 'disliked Comment' });
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
})

router.put('/post/dislike/:id', varifyToken, async (req, res) => {
    try {
        const checkLike = await Post.findById(req.params.id).select({ likes: 1 });
        const dislikeUser = await Post.findById(req.params.id);
        if (checkLike.likes.includes(req.user.username)) {
            res.status(400).json({ error: 'You already liked this post' });
        }
        else {
            await Post.updateOne({ _id: req.params.id },
                {
                    $push: { dislikes: req.user.username }
                }, { useFindAndModify: false });
            await User.updateOne({ username: dislikeUser.username },
                { $inc: { rating: -1 } }, { useFindAndModify: false });
            res.status(200).json({ message: 'Disliked Post' });
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
})

router.delete("/post/delete/:id", varifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json({ message: 'Post deleted' });
    } catch {
        res.status(400).json({ error: err, message: "got an error" });
    }
});

router.put("/profilepicupdate/:id" , varifyToken , async (req,res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        if(!user|| req.body.length===0){
            res.status(400).json({error: "no file submited"});
        }
        const memeUrl = req.body.url;
        const uploadResponse = await cloudinary.uploader.upload(memeUrl, {
            upload_preset: 'drpzet'
        })
        let urlImage = uploadResponse.url;
        let tmp = urlImage.split("upload");
        urlImage = tmp[0] + "upload/w_300,h_200,c_scale"+tmp[1];

        await User.updateOne({username: req.user.username},{ avatar : urlImage },{ useFindAndModify: false });
        res.status(200).json( {message: "Updated successfully"})
    } catch (error) {
        res.status(400).json({ error : error })
    }
})



module.exports = router;