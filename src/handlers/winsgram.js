const { Client, Interaction } = require("discord.js");
const { OpenAIApi } = require("openai");
/**
 * W-Instagram
 * @param { Client } client
 * @param { Interaction} interaction
 * @param { OpenAIApi } openai
 */
module.exports = async (client, interaction, openai) => {
  const commandName = interaction.commandName;
  let prompt = null;
  if (commandName == "w-ins-product") {
    const templateGuide = require("../templates/instgram/ins-product");

    // options  keyword, checkpoint, target, product
    const keyword = interaction.options.get("keyword")?.value;
    const checkpoint = interaction.options.get("checkpoint")?.value;
    const target = interaction.options.get("target")?.value;
    const product = interaction.options.get("product")?.value;

    console.log(
      ` w-ins-product user input : ${keyword} ,  ${checkpoint} ,  ${target} , ${product}`
    );

    prompt = templateGuide(keyword, checkpoint, target, product);
  }
  console.log(`w-ins-product prompt :: ${prompt}`);
  if (prompt != null) {
    try {
      await interaction.deferReply();
      const messages = [{ role: "user", content: `${prompt}` }];
      let gptReply = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 500,
        messages: messages,
      });
      await interaction.followUp(`${gptReply.data.choices[0].message.content}`);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("bad input");
  }
};
