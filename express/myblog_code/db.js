var mongoose = require("mongoose")
var config = require("./config")


var connect = function connect() {
    mongoose.connect(config.mongodb, {useNewUrlParser: true})
    var db = mongoose.connection
    db.on('error', function(err) {
        console.log("connect db fail", err)
    })
    db.once('open', function() {
        console.log("connect db ok")
    })

}

module.exports.connect = connect
