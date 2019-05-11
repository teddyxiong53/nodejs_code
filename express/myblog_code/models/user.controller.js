const User = require("./user.model")
module.exports = {
    create: function create(user) {
        return User.create(user).exec()
    },
    getUserByName: function getUserByName(name) {
        return User.findOne({name: name})
        .exec()
    }
}
