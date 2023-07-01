require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const rest = new REST({ version: 10 }).setToken(
  process.env.DISCORDS_BOT_APP_TOKEN
);

const testGuildsList = async () => {
  try {
    // The put method is used to fully refresh all commands in the guild with the current set

    // 975859028154535976
    const data = await rest.get(
      Routes.guildMembers(process.env.DISCORDS_SERVER_ID)
    );
    //Routes.applicationGuildCommands(process.env.Client_ID, process.env.BOT_APP_ID),

    console.log(data);

    // fetch user  informations
    const userData = await rest.get(
      Routes.guildMember(process.env.DISCORDS_SERVER_ID, "975859028154535976")
    );

    console.log("userData:::");
    console.log(userData);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};

testGuildsList();
