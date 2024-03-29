// dotenv
require("dotenv").config();
const { mongoose } = require("mongoose");
const topUp = require("./componments/topup");
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

// start open mongodb
(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CONNECTION, { keepAlive: true });
    console.log("mongo connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

discordClient.on("interactionCreate", async (action) => {
  if (!action.isChatInputCommand) return;

  if (action.commandName == "service") {
    try {
      topUp.execute(action);
    } catch (error) {
      console.log(error);
    }
  } else {
    const balanceCheck = require("./billing/balanceCheck");
    const { noChargeCheck } = require("./billing/NoChargeChannel");
    try {
      let resultCheck = await noChargeCheck(action);
      if (resultCheck && resultCheck.isOk) {
        console.log(resultCheck);
      } else {
        resultCheck = await balanceCheck(action);
      }
      //const
      console.log(`balance check :: ${resultCheck}`);
      if (resultCheck.isOk) {
        action.chargeType = resultCheck.chargeType;
        if (action.commandName == "chatgpt") {
          //action.reply('chat with gpt')
          const chatGpt = require("./handlers/chatGptHandler");
          chatGpt(Client, action, openAiClient);
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
      } else {
        if (resultCheck.errCode && resultCheck.errCode == "no_subscribe") {
          topUp.executePayNotice(action);
        } else {
          action.reply(resultCheck.errMsg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

discordClient.login(process.env.DISCORDS_BOT_APP_TOKEN);
console.log("ChatGPT bot is Online");
