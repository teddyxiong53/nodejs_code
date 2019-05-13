const UserModel = require("./user.model")
module.exports = {
    create: async function create(user) {
        const userLocal = new UserModel(user)
        await userLocal.save((err, result) =>{
            if(err) {
                console.log("保存user失败", err);
                return
            }
            console.log("创建用户成功")

        })
    },
    getUserByName: function getUserByName(name) {
        return UserModel.findOne({name: name})
        .exec()
    }
}
