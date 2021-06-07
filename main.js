const {
    Client
} = require('discord.js')
const WS = require('./ws/ws')
const config = require('./config.json')

var client = new Client()
client.config = config

var ws = new WS(config.ws.token, config.ws.port, client)

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
})

client.login(config.token)