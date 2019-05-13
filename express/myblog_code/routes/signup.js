const User = require("../models/user.controller")
const express = require("express")
const router = express.Router()


const checkNotLogin = require("../middlewares/check").checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signup')
})

router.post('/', checkNotLogin, function(req, res, next) {
    //console.log(req)
    const name = req.fields.name
    const gender = req.fields.gender
    const bio = req.fields.bio
    const password = req.fields.password
    const repassword = req.fields.repassword

    // 检查表单内容
    try {
        if(!(name.length >=1 && name.length<=10)) {
            throw new Error('名字长度在1到10个字符')
        }
        if(['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error("性别只能是男、女或者保密")
        }
        if(password.length < 1) {
            throw new Error("密码长度至少一个字符")
        }
        if(password !== repassword) {
            throw new Error("两次输入的密码不一样")
        }

    } catch(e) {
        req.flash('error', e.message)
        console.log(e.message)
        return res.redirect('/signup')
    }
})
module.exports = router
