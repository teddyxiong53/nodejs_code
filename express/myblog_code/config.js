module.exports = {
    ports: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 72000
    },
    mongodb: 'mongodb://localhost/myblog'
}