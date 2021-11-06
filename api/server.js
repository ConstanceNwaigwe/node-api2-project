// implement your server here
// require your posts router and connect it here
const express = require('express');
const postrouter = require('./posts/posts-router');
const server = express();
server.use(express.json());

server.use('/api/posts', postrouter);

server.use('*', (req,res) => {
    res.status(404).json({message: 'not found'})
});

module.exports = server;