var express = require("express")
var logger = require('morgan')
var path = require("path")
var session = require("express-session")
var MongoStore = require("connect-mongo")(session)
var config = require("./config")
var routes = require("./routes")
var flash = require('connect-flash')
var db  = require("./db")
var ejs = require("ejs")

app = express()

db.connect()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: config.session.secret,
    name: config.session.key,
    store: new MongoStore({
        url: config.mongodb
    }),

    cookie: {
        maxAge: config.maxAge
    },
    resave: true,
    saveUninitialized: false

}))

app.use(flash({

}))

app.locals.blog = {
    title: 'myblog',
    description: "myblog desc"
}

// 添加模板需要的3个变量
app.use(function(req, res, next) {
    app.locals.user = req.session.user
    app.locals.success = req.flash('success').toString()
    app.locals.error = req.flash('error').toString()
    next()
})

app.use(logger('dev'))

routes(app)

//app.use(logger('dev'))

app.listen(config.ports)