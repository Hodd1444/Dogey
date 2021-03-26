const BaseEvent = require('../utils/structures/BaseEvent');
const config = require('../../config.json')

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('newChatMessage')
    }
    async run(client, message) {
        

        // Possible auto-moderation 
        // message.content.split().forEach(async (word) => {
        //     if(config.banned_words[word]) {
        //         await message.delete().catch(err => console.log(err))
        //         await message.author.whisper("Please don't say that word here ;-;")
        //     } else return;
        // });
        
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