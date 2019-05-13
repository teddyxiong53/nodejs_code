var mongoose = require("mongoose")
var lastMod = require("./lastMod")
mongoose.connect("mongodb://localhost/test2", {useNewUrlParser: true})
var db = mongoose.connection

var Schema = mongoose.Schema
db.once('open', function() {
    console.log("open ok")
})

var userSchema = new Schema({
    name: String,
    age: Number
})
userSchema.plugin(lastMod, {index: true})
var User = mongoose.model('User', userSchema)
User.create({
    name: 'allen',
    age: 10
}, function(err) {
    if(err) {
        console.log("create error")
        return
    }
    console.log("create ok")
})
