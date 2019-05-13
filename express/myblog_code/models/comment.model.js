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

var CommentModel = mongoose.model('CommentModel', commentSchema)
module.exports  = CommentModel
