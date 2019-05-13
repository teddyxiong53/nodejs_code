var mongoose = require("mongoose")


var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:32
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: 'x'
    },
    bio: {
        type: String,
        required: true
    }

})
//'User' 会对应数据库里的表，users。
UserModel = mongoose.model('User', userSchema)


module.exports = UserModel


