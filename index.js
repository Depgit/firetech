const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');
// const {Server} = require('socket.io');

const PORT = process.env.PORT || 8080;

// checkng routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/post');
const contest = require('./routes/contest');
const message = require('./routes/message');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'"],
            "base-uri": ["'self'"],
            "font-src": ["'self'", "https:", "data:"],
            "frame-ancestors": ["'self'"],
            "img-src": ["'self'", "data:", "http://res.cloudinary.com"],
            "script-src": ["'self'"],
            "script-src-attr": ["'none'"],
            "style-src": ["'self'", "https:", "'unsafe-inline'"],
        }
    })
)

app.use(morgan('common'));
app.use(cors());


// routes middelware
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/contest', contest);
app.use('/api/message', message);

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// const server = app.listen(PORT, () => { 
//     console.log(`Server listening on ${PORT}`);
// });



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// setup socket.io
// const io = new Server(server,
//     {
//         cors:{
//             origin:'*',
//             methods:['GET','POST','PUT','DELETE','OPTIONS'],
//         }
//     }
// );
// app.use((req,res,next)=> {
//     req.io = io;
//     next();
// })


