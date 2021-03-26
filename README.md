<p align="center">
  <img src="https://cdn.discordapp.com/emojis/735384390515032084.gif" alt="DogeGarden logo" />
</p>
<p align="center">
  <strong>dogehouse.js bot template with command handler 🤖</strong>
</p>

## How to set up your bot

1. Go to [DogeHouse](https://dogehouse.tv)
2. Open Developer options (F12 or Ctrl+Shift+I)
3. Go to Application > Local Storage > dogehouse.tv
4. Open the `config.json` file
5. Replace the following variables with your token and refresh-token found in step 3

```json
"token": "<your-token-here>",
"refreshtoken": "<your-refresh-token-here>"
```

6. Install [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).
7. Run the `npm i` command in the root direction to make sure all dependencies are installed correctly
8. Your bot is set up and is ready to be fed with commands 🙌

## How to set up new commands

1. Create a new file in the `./src/commands` directory
2. Name it anything you want and copy the basic command structure found below:

```js
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand { // Replace "TestCommand" with the name of your command
    constructor() {
        super('<command name/trigger>', '<command category>', ['<command alias 1>', '<command alias 2>']) // Aliases are optional, you can leave the array empty
    }
    async run(client, message, args) {
        //Your code here
    }
}
```

3. Start coding and be creative!

## Credits

This command handler is based off of a discord bot command handler by [Anson the Developer](https://www.youtube.com/channel/UCvjXo25nY-WMCTEXZZb0xsw) called [slappey](https://github.com/stuyy/slappey). I just rewrote the code his project creates to be able to be used with [dogehouse.js](https://github.com/dogegarden/dogehouse.js) 
