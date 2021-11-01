// implement your posts router here
const express = require('express');

const router = express.Router();

router.get('/api/posts', (req, res) => {
    if(!req.body){
        res.status(500).json({ message: "The posts information could not be retrieved" });
    }
    else{
        res.status(200).send("Success");
    }
});

router.get('/api/posts/:id', (req, res) => {
    //
});
