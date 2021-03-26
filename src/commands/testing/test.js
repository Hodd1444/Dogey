const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('test', 'testing', ['t'])
    }
    async run(client, message, args) {
        console.log('init')
        await message._client.bot.sendMessage("Test command works perfectly!")
    }
}