const BaseEvent = require('../utils/structures/BaseEvent');
const config = require('../../config.json')

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('newChatMessage')
    }
    async run(client, message) {
    
        // Command handler
        if(message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content
            .slice(client.prefix.length)
            .trim()
            .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
            }
        }
    }
}