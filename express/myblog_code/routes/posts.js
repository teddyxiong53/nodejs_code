const express = require("express")
const router = express.Router()


router.get('/', function(req, res, next) {
    const author = req.query.author
    console.log("11")
    res.render("posts")
})

module.exports = router