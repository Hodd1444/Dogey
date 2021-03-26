const config = require('./config.json');
const { Client } = require('dogehouse.js');
const joinroom = require('./src/events/joinroom.js')
const { registerCommands, registerEvents} = require('./src/utils/registry')


const app = new Client();

(async () => {
    app.commands = new Map();
    app.events = new Map();
    app.prefix = config.prefix;
    await registerCommands(app, '../commands');
    await registerEvents(app, '../events');

    // Connects the Bot
    await app.connect(config.token, config.refreshtoken).then(console.log('Bot connected!'));

    // Automatically joins the top room
    await joinroom(app).catch(err => console.log(err))
})();