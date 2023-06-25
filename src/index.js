// dotenv
require("dotenv").config();

//console.log(process.env.KEY_API_TOKEN_RECORDS);
//console.log( process.env.CHAT_GPT_ORGID)
//console.log( process.env.KEY_CHAT_GPT_ORGID)

// authorize 2   https://discord.com/oauth2/authorize?client_id=1104811428281593897&scope=bot&permissions=1

const { Client, GatewayIntentBits } = require("discord.js");
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");
const OpenAIConfig = new Configuration({
  apiKey: process.env.KEY_CHAT_GPT_ORGID,
});

const openAiClient = new OpenAIApi(OpenAIConfig);

discordClient.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    var mentionUsers = message.mentions.users;
    console.log(mentionUsers);
    message.reply("this is a chat bot");
    console.log(message.content);
  } catch (error) {
    console.log(error);
  }
});

discordClient.on("interactionCreate", async (action) => {
  //console.log(action)
  if (!action.isChatInputCommand) return;

  if (action.commandName == "top-up") {
    const topUp = require("./componments/topup");
    topUp.execute(action);
  }

  if (action.commandName == "chat") {
    //action.reply('chat with gpt')
    const prompt = action.options.get("prompt").value;
    action.reply(`echo ${prompt}`);
  }
  if (action.commandName == "chatgpt") {
    //action.reply('chat with gpt')
    const prompt = action.options.get("prompt").value;
    await action.deferReply(true);
    let gptReply = await openAiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.9,
      max_tokens: 500,
      stop: ["ChatGPT"],
    });
    //action.deferReply(`${gptReply.data.choices[0].text}`);
    // action.editReply(`${gptReply.data.choices[0].text}`);
    await action.followUp(`${gptReply.data.choices[0].text}`);
  }
  if (action.commandName == "w-twitter") {
    const wtwitter = require("./handlers/wtwitter");
    wtwitter(action, openAiClient);
  }
  if (action.commandName == "w-tiktok-guide") {
    const wtiktok = require("./handlers/wtiktok");
    wtiktok(Client, action, openAiClient);
  }
  if (action.commandName == "w-ins-product") {
    const winstagram = require("./handlers/winsgram");
    winstagram(Client, action, openAiClient);
  }
});

discordClient.login(process.env.DISCORDS_BOT_APP_TOKEN);
console.log("ChatGPT bot is Online");
