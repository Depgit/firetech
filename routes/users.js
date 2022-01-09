const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');

/**
 * @route DELETE api/users/delete/:id
 */
router.delete('/delete/:id',varifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || req.user._id !== req.params.id){
            return res.status(404).send('User not found or wrong credentials');
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User deleted');
    }
    catch(err){
        res.status(400).send(err);
    }
});

/**
 * @router PUT api/users/follow/:id
 */
router.put('/follow/:id',varifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || req.user._id === req.params.id){
            return res.status(404).send('you can not follow yourself or wrong credentials');
        }
        user.follower.push(req.user._id);
        await user.save();
        res.status(200).send('User followed');
    }
    catch(err){
        res.status(400).send(err);
    }
});

/**
 * @router PUT api/users/unfollow/:id
 */
router.put('/unfollow/:id',varifyToken,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || req.user._id === req.params.id){
            return res.status(404).send('you can not unfollow yourself or wrong credentials');
        }
        const index = user.follower.indexOf(req.user._id);
        // splice(x,1) means remove 1 element from index x
        user.follower.splice(index,1);
        await user.save();
        res.status(200).send('User unfollowed');
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;