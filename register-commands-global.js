require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "chatgpt",
    description: "chat with openai",
    options: [
      {
        name: "prompt",
        description: "chat prompt",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
  {
    name: "w-twitter",
    description: "write twitter context",
    options: [
      {
        name: "share_information",
        description: "分享这些信息",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "target",
        description: "目标人群",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "brand",
        description: "提高观众对我们的这个品牌的影响力",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "experts",
        description: "打造这个方面的专家",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
  {
    name: "w-tiktok-guide",
    description: "Tiktok—文案和剧本—产品相关-教程式",
    options: [
      {
        name: "keyword",
        description: "用这些关键词提出问题",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "checkpoint",
        description: "受众痛点",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "target",
        description: "目标人群",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "product",
        description: "让观众对我们的这个产品感兴趣",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
  {
    name: "w-ins-product",
    description: "Instagram—文案—面向目标人群-产品相关",
    options: [
      {
        name: "keyword",
        description: "用这些关键词提出问题",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "checkpoint",
        description: "受众痛点",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "target",
        description: "目标人群",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
      {
        name: "product",
        description: "让观众对我们的这个产品感兴趣",
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
];

const rest = new REST({ version: 10 }).setToken(
  process.env.KEY_API_TOKEN_RECORDS
);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(process.env.Client_ID, { body: commands }),
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
