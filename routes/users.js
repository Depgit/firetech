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
            return res.status(404).json({error:'User not found or wrong credentials'});
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'User deleted'});
    }
    catch(err){
        res.status(400).json({error:err});
    }
});

/**
 * @router PUT api/users/follow/:id
 */
router.put('/follow/:id',varifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || req.user._id === req.params.id || user.follower.includes(req.user._id)){
            return res.status(404).json({error:'you can not follow yourself or wrong credentials or already followed'});
        }
        user.follower.push(req.user._id);
        await user.save();
        res.status(200).json({message:'User followed'});
    }
    catch(err){
        res.status(400).json({error:err});
    }
});

/**
 * @router PUT api/users/unfollow/:id
 */
router.put('/unfollow/:id',varifyToken,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || req.user._id === req.params.id || !user.follower.includes(req.user._id)){
            return res.status(404).json({error:'you can not unfollow yourself or wrong credentials'});
        }
        const index = user.follower.indexOf(req.user._id);
        // splice(x,1) means remove 1 element from index x
        user.follower.splice(index,1);
        await user.save();
        res.status(200).json({message:'User unfollowed'});
    }catch(err){
        res.status(400).json({error:err});
    }
});

module.exports = router;