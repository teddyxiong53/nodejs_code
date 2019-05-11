var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

var Comment = mongoose.model('Comment', commentSchema)
module.exports  = Comment
