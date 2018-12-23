const express = require('express')
const fs = require('fs')
const sha1 = require("sha1")
const path = require("path")
const router = express.Router()

const UserModel = require('../models/users')

const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signup')
})

router.post('/', checkNotLogin, function(req, res, next) {
    const name = req.fields.name
    const gender = req.fields.gender
    const bio = req.fields.bio
    const avatar = req.files.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    const repassword = req.fields.repassword
    try {
        if(!(name.length>=1 && name.length<=10)) {
            throw new Error("名字长度1到10个字符")
        }
        if(['m', 'f', 'x'].indexOf(gender) == -1) {
            throw new Error("性别只能是m、f或者x")
        }
        if(!(bio.length >=1 && bio.length <= 30)) {
            throw new Error("个人简介在1到30个字符之间")
        }
        if(!req.files.avatar.name) {
            throw new Error('缺少头像')
        }
        if(password !== repassword) {
            throw new Error("两次输入密码不一样")
        }
    } catch(e) {
        fs.unlink(req.files.avatar.path, function(err) {
            if(err) {
                console.log('xhl -- unlink failed 1')
                throw err;
            }
        })
        req.flash('error', e.message)
        return res.redirect('/signup')
    }
    password = sha1(password)
    let user = {
        name: name,
        password: password,
        gender: gender,
        bio : bio,
        avatar: avatar
    }
    UserModel.create(user).then(function(result) {
        user = result.ops[0]
        delete user.password
        req.session.user = user
        req.flash('success', '注册成功')
        res.redirect('/posts')
    })
    .catch(function(e) {
        fs.unlink(req.files.avatar.path, function (err) {
            if(err) {
                console.log('xhl -- unlink failed')
                throw err;
            }
        })
        if(e.message.match('duplicate key')) {
            req.flash('error', '用户名已经被占用')
            return res.redirect('/signup')
            
        }
        next(e)
    })
})

module.exports = router
