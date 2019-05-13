const express = require("express")
const router = express.Router()

const UserModel = require("../models/user.model")
const checkNotLogin = require("../middlewares/check").checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
    console.log("22")
    res.render("signin")
})

router.post('/', checkNotLogin, function(req, res, next) {
    let name = req.fields.name
    let password = req.fields.password
    try {
        if(!name.length) {
            throw new Error("请填写用户名")
        }
        if(!password.length) {
            throw new Error("请填写密码")
        }

    } catch(e) {
        req.flash('error', e.message)
        res.redirect('back')
    }
    UserModel.findOne({name: name}, (err, user) => {
        if(err) {
            console.log(err)
            res.redirect('back')
        }
        console.log("find user:", user)
        if(!user) {
            console.log('not found user')
            req.flash('error', '没有找到用户名')
            res.redirect('back')
            return
        }
        if(user.password !== password) {
            req.flash('error', '密码错误')
            res.redirect('back')
            return
        }
        console.log('登陆成功')
        req.session.user = user
        res.redirect('/posts')

    })
})
module.exports = router