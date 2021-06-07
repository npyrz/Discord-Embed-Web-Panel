const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require("body-parser");
const path = require('path')
const Discord = require("discord.js");

/**
 
  @param {string}         token 
  @param {number}         port   
  @param {discord.Client} client 
 */
class WebSocket {

    constructor(token, port, client) {
        this.token = token
        this.port = port
        this.client = client
        this.app = express()


        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/layouts'
        }))

        this.app.set('views', path.join(__dirname, 'views'))

        this.app.set('view engine', 'hbs')

        this.app.use(express.static(path.join(__dirname, 'public')))

        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());

        this.registerRoots()


        this.server = this.app.listen(port, () => {
            console.log("Websocket API set up at port " + this.server.address().port)
        })
    }

    /**
     * @param {string} _token 
     * @returns {boolean} 
     */
    checkToken(_token) {
        return (_token == this.token)
    }

    registerRoots() {
        this.app.get('/', (req, res) => {
            var _token = req.query.token
            if (!this.checkToken(_token)) {
                res.render('error', {
                    title: "ERROR"
                })
                return
            }
            var chans = []
            this.client.guilds.first().channels
                .filter(c => c.type == 'text', 'text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8')
                .forEach(c => {
                    chans.push({
                        id: c.id,
                        name: c.name
                    })
                })

            res.render('index', {
                title: "SECRET INTERFACE",
                token: _token,
                chans
            })
        })

        this.app.post('/sendMessage', (req, res) => {
            var _token = req.body.token
            var channelid = req.body.channelid
            var text = req.body.text
            var text1 = req.body.text1
            var text2 = req.body.text2
            var text3 = req.body.text3
            var text4 = req.body.text4
            var text5 = req.body.text5
            var text6 = req.body.text6
            var text7 = req.body.text7
            var text8 = req.body.text8

            if (!_token || !channelid || !text || !text1 || !text2 || !text3 || !text4 || !text5 || !text6 || !text7 || !text8)
                return res.sendStatus(400);

            if (!this.checkToken(_token))
                return res.sendStatus(401)

            var chan = this.client.guilds.first().channels.get(channelid)

            var dateTime = new Date();
            if (chan) {
                let embed = new Discord.RichEmbed()
                    .setTitle(text)
                    .setDescription(text1)
                    .setColor(text2)
                    .setImage(text3)
                    .setAuthor(text4)
                    .setThumbnail(text5)
                    .setFooter(text6)
                    .setURL(text7)
                    .setTimestamp(text8)

                chan.send(embed)

                res.sendStatus(200)
            } else
                res.sendStatus(406)
        })
    }
}
module.exports = WebSocket