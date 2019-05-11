var Post = require('./post.model')
//console.log(Post)
module.exports = {
    create: function create(post) {
        return Post.create(post).exec()
    },
    getPostById: function getPostById(id) {
        return Post.findOne({_id: id})
        .exec()
    },
    getPosts: function getPosts(author) {
        const query = {}
        //console.log(Post)
        if(author) {
            query.author = author
        }
        return Post.find(query).exec()
    }
}