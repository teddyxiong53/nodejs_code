const express = require("express")
const router = express.Router()

const Post = require("../models/post.controller")

router.get('/', function(req, res, next) {
    const author = req.query.author
    console.log("11")
    Post.getPosts(author).then(function(posts) {
        res.render('posts', {
            posts: "xxx"
        })
    }).catch(next)
})

module.exports = router