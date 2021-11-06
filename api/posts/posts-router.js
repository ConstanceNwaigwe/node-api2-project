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
    const {title, content} = req.body;
    if(!title || !content){
        res.status(404).json({
            message: "Please provide title and contents for the post"
        })
    } else{
        Posts.insert({title, content})
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message
            });
        })
    }
})
router.put('/api/post/:id', (req,res) => {
    const {title, content} = req.body;
    if(!title || !content){
        res.status(404).json({
            message: "Please provide title and contents for the post"
        })
    } else{
        Posts.findById(req.params.id)
        .then(newPost => {
            if(!newPost){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                });
            }
            else{
                return Posts.update(req.params.id, req.body);
            }
        })
        .then(data => {
            if(data){
                return Posts.findById(req.params.id)
            }
        })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message
            });
        })
    }
})
router.delete('/api/post/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const getPost = await Posts.findById(id);
        if(!getPost){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Posts.remove(id);
            res.status(200).json(getPost);
        }
    }
    catch (err){
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message
        })
    }
})
router.get('/api/posts/:id/comments', (req,res) => {
    //
})

module.exports = router;
