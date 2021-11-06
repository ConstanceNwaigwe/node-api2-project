// implement your posts router here
const express = require('express');

const router = express.Router();
const Posts = require('../posts/posts-model');

router.get('/', (req,res) => {
    res.send("/")
})
router.get('/api/posts', (req,res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(Posts);
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message
        })
    })
})
router.get('/api/post/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const getPost = await Posts.findById(id);
        if(!getPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(getPost);
        }
    }
    catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message
        })
    }
})
router.post('/api/posts', (req,res) => {
    //
})
router.put('/api/post/:id', (req,res) => {
    //
})
router.delete('/api/post/:id', (req,res) => {
    //
})
router.get('/api/posts/:id/comments', (req,res) => {
    //
})

module.exports = router;
