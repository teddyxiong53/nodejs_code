var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/test1", {useNewUrlParser: true})
var db = mongoose.connection

var Schema = mongoose.Schema
db.once('open', function() {
    console.log("open ok")
})


/*
var userSchema = new Schema({
    name: String,
    nameBinary: Buffer,
    age: {
        type: Number,
        max: 100,
        min: 1
    },
    isMale: Boolean,
    birthday: {
        type: Date,
        default: Date.now
    },
    _userId: Schema.Types.ObjectId,
    money: Schema.Types.Decimal128,
    habits: [String],
    grade: [Number],
    teachers: {
        chinese: {
            name: String
        },
        math: {
            name: String
        }
    }
})
*/
var userSchema = new Schema ({
    name: String,
    age: Number
})

//演示类型
/*
var User = mongoose.model('User', userSchema)
var allen = new User
allen.name = 'allen'
allen.nameBinary = Buffer.from(allen.name)
allen.age  = 10
allen.isMale = true
allen._userId = new mongoose.Types.ObjectId
//allen.money = new mongoose.Types.Decimal128()
allen.save(console.log)
*/


//演示实例方法
/*
userSchema.methods.func1 = function (cb) {
    return this.model('User').find({
        //name: this.name
    }, cb)
}
var User = mongoose.model('User', userSchema)

var allen = new User({
    name: 'allen',
    age: 10
})
var bob = new User({
    name: 'bob',
    age: 10
})
allen.func1(function(err, users) {
    console.log(users)
})
*/
//演示静态方法
/*
userSchema.statics.findByName = function(name, cb) {
    return this.find({name: new RegExp(name, 'i')}, cb)
}
var User = mongoose.model('User', userSchema)
var allen = new User({
    name: 'allen',
    age: 10
})
var bob = new User({
    name: 'bob',
    age: 10
})
User.findByName('allen', function(err, users) {
    console.log(users)
})
*/


//演示一行数据的产生和保存
/*
var User = mongoose.model('User', userSchema)
var allen = new User({
    name: 'allen',
    age: 10
})
allen.save(function(err) {
    if(err) {
        console.log("save error")
        return
    }
    console.log("save ok")
})


User.create({
    name: 'bob',
    age: 11
}, function(err, user) {
    if(err) {
        console.log("save fail")
        return
    }
    console.log("save ok")
    console.log(user)
})
*/
//演示数据的查找
/*
var User = mongoose.model('User', userSchema)
User.find({name: 'allen'}).where('name').eq('bob').exec(console.log)
*/

//演示数据的删掉
/*
var User = mongoose.model('User', userSchema)
User.remove({name: 'bob'}, function(err) {
    if(err) {
        console.log(err)
    }

})
*/
//更新一条数据
/*
var User = mongoose.model('User', userSchema)
User.findOneAndUpdate({name: 'allen'}, {name: 'bob'},{}, function(err) {
    if(err) {
        console.log(err)
        return
    }
    console.log("update ok")
})
*/

