require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "top-up",
    description: "payment",
  },
];

const rest = new REST({ version: 10 }).setToken(
  process.env.DISCORDS_BOT_APP_TOKEN
);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORDS_BOT_APP_ID, {
        body: commands,
      }),
      //Routes.applicationGuildCommands(process.env.Client_ID, process.env.BOT_APP_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
