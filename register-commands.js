require('dotenv').config();
const {REST , Routes ,  ApplicationCommandOptionType} = require('discord.js')

const commands = [
    {
        name:'chat',
        description:'chat with openai',
		options:[
			{
				name : 'prompt',
				description:'chat prompt',
				type: ApplicationCommandOptionType.String,
				require: true
			}
		]
    }
]



const rest = new REST({version:10}).setToken(process.env.KEY_API_TOKEN_RECORDS); 

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.Client_ID, process.env.BOT_APP_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();