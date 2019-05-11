var Comment = require("./comment.model")

module.exports = {
    create: function create(comment) {
        return Comment.create(commnet).exec()
    },
    getCommentById: function getCommentById(id) {
        return Comment.findOne({_id: id}).exec()
    },
    getComments: function getComments(postId) {
        return Comment.find({postId: postId})
        .exec()
    }
}