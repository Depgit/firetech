const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const User = require('../models/User');
const Group = require('../models/Group');

/**
 * @route POST api/group/create
 */
router.post('/create', varifyToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).send('User not found');
    }
    const group = await new Group(req.body);
    group.members.push(req.user._id);
    try{
        await group.save();
        res.status(201).json(group);
    }
    catch(err){
        res.status(400).send(err);
    }
});


/**
 * @route PUT api/group/join
 */
router.put('/join/:id', varifyToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).send('User not found');
    }
    const group = await Group.findById(req.params.id);
    if(!group){
        return res.status(404).send('Group not found');
    }
    if(group.members.includes(req.user._id)){
        return res.status(400).send('User already in group');
    }
    group.members.push(req.user._id);
    try{
        await group.save();
        res.status(200).json(group);
    }
    catch(err){
        res.status(400).send(err);
    }
});


/**
 * @route PUT api/group/message
 */
router.put('/message/:id', varifyToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    const group = await Group.findById(req.params.id);
    const newMessage = {
        message: req.body.message,
        user : req.user._id
    };
    try{
        if(!user || !group || !group.members.includes(req.user._id)){
            return res.status(404).send('User not found or group not found or user not in group');
        }
        group.messages.push(newMessage);
        await group.save();
        res.status(200).json(group);
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;