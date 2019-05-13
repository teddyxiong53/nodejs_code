const express = require("express")
const router = express.Router()

const checkLogin = require("../middlewares/check").checkLogin
const PostModel = require("../models/post.model")

router.get('/', function (req, res, next) {
    //const author = req.query.author
    //console.log("11")
    PostModel.find({}, function (err, posts) {
        if (err) {
            console.log('read posts fail')

        }
        res.render("posts", {
            posts: posts
        })
    })

})

router.get('/create', checkLogin, function (req, res, next) {
    res.render('create')
})

router.post('/create', checkLogin, function (req, res, next) {
    let title = req.fields.title
    let content = req.fields.content
    let author = req.session.user._id
    try {
        if (!title.length) {
            throw new Error("标题不能为空")
        }
        if (!content.length) {
            throw new Error("内容不能为空")
        }
    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
    let post = {
        author: author,
        title: title,
        content: content
    }
    PostModel.create(post, function (err, result) {
        if (err) {
            console.log('create post fail')
            return res.redirect('back')
        }

        console.log('save post ok')
        req.flash('success', '发表成功')
        res.redirect('/posts')

    })

})
module.exports = router