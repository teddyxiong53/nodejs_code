const meow = require("meow")
//const publicIp = require("public-ip")

const cli = meow(`
    Usage
        $ public-ip
    Options
        --ipv4, -4 return ipv4 address
        --ipv6, -6 return ipv6 address
        --https, -h use https
        --timeout=<ms>, -t timeout is ms

    Examples
        $ public-ip

`, {
    flags: {
        ipv4: {
            type: 'boolean',
            alias: '4'
        },
        ipv4: {
            type: 'boolean',
            alias: '6'
        },
        https: {
            type: 'boolean',
            alias: 'h'
        },
        timeout: {
            type: 'string',
            alias: 't'
        }
    }
})

