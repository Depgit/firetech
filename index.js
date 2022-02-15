const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// routes sending into master
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/post');
const groups = require('./routes/group');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('Connected to MongoDB');
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// routes middelware
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/groups', groups);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
    
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});