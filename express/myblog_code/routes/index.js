module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/posts')
    })
    app.use('/signup', require('./signup'))
    app.use('/posts', require('./posts'))
}