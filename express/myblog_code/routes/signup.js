
const express = require("express")
const router = express.Router()
const UserModel = require("../models/user.model")

const checkNotLogin = require("../middlewares/check").checkNotLogin

router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup')
})

router.post('/', checkNotLogin, function (req, res, next) {
    //console.log(req)
    const name = req.fields.name
    const gender = req.fields.gender
    const bio = req.fields.bio
    const password = req.fields.password
    const repassword = req.fields.repassword

    // 检查表单内容
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字长度在1到10个字符')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error("性别只能是男、女或者保密")
        }
        if (password.length < 1) {
            throw new Error("密码长度至少一个字符")
        }
        if (password !== repassword) {
            throw new Error("两次输入的密码不一样")
        }


    } catch (e) {
        req.flash('error', e.message)
        console.log(e.message)
        return res.redirect('/signup')
    }
    // 保存到数据库里
    let user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio
    }

    UserModel.create(user, function (err, result) {
        //console.log("create result:", result)
        if (err) {
            req.flash('error', '注册失败')
            res.redirect('/signup')
        }
        let user = result
        //创建用户成功。返回保存用户的Promise
        user.save(function (err, result) {
            if (err) {
                throw new Error("保存用户到数据库失败")
            }
            //console.log("save result:", result)
        })
        //把user信息保存到session里。
        //把敏感信息去掉。
        delete user.password
        req.session.user = user

        req.flash('success', '注册成功')
        res.redirect("/posts")
    })
})
module.exports = router