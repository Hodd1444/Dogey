const config = require('./config.json');
const { Client } = require('dogehouse.js');
const joinroom = require('./src/events/joinroom.js')

const { registerCommands, registerEvents} = require('./src/utils/registry')

const messageEvent = require('./src/events/message.js');
const UserController = require('dogehouse.js/src/controllers/UserController');


const app = new Client();

(async () => {
    app.commands = new Map();
    app.events = new Map();
    app.prefix = config.prefix;
    await registerCommands(app, '../commands');
    await registerEvents(app, '../events');

    await app.connect(config.token, config.refreshtoken).then(console.log('Bot connected!'));

    await joinroom(app).catch(err => console.log(err))

    app.on('userJoinedRoom', async(user) => {
        await user.whisper("Hello, my name is XenoxBot and I am currently in state of being developed in this chatroom. Feel free to hit my programmer up on Discord: Hodd#1444")
    })
})();