require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const OpenAIConfig = new Configuration({
  apiKey: process.env.KEY_CHAT_GPT_ORGID,
});

const openAiClient = new OpenAIApi(OpenAIConfig);

const main = async () => {
  const prompt = "can you give me idea of create a DEX application";
  const messages = [{ role: "user", content: `${prompt}` }];
  try {
    let gptReply = await openAiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 500,
      messages: messages,
    });
    console.log(gptReply.data.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
};

main();
