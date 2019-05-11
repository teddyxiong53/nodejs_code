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
    }

})
User = mongoose.model('User', userSchema)

module.exports = User


