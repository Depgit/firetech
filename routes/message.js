const router = require('express').Router();
const varifyToken = require('../middleware/auth');
const GlobalMessage = require('../models/GlobalMessage');
const io  = require('../index');
/**
 * @route POST api/message/global
 */
router.post('/global',varifyToken,(req,res)=>{
    const newMessage = new GlobalMessage({
        from: req.user.username,
        body: req.body.body,
    });
    // req.io.sockets.emit('message',{
    //     from: req.user.username,
    //     body: req.body.body,
    // });
    newMessage.save().then(message => {
        res.status(201).json({ message: message, created: true });
    }).catch(err => {
        res.status(400).json({error: err});
    });
})

router.delete('/globalDelete',(req,res)=>{
    GlobalMessage.deleteMany({}).then(()=>{
        res.status(200).json({message: 'Message Deleted'});
    }).catch(err => {
        res.status(400).json({error: err});
    });
})

/**
 * @router GET api/message/global
 */
router.get('/global',varifyToken,(req,res)=>{
    GlobalMessage.find({},{_id:0,__v:0,date:0})
    .then(messages => {
        res.status(201).json({ messages, created: true });
    }).catch(err => {
        res.status(400).json({error: err});
    });
})

module.exports = router;
