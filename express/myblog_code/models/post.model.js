var mongoose = require("mongoose")

var Schema = mongoose.Schema

var postSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

})
PostModel = mongoose.model('Post', postSchema)
//console.log(Post)
module.exports = PostModel

