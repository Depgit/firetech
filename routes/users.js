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
    

module.exports = router;