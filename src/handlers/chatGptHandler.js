const { Client, Interaction } = require("discord.js");
const { OpenAIApi } = require("openai");

const userLog = require("../models/userLog");
/**
 * W-Instagram
 * @param { Client } client
 * @param { Interaction} interaction
 * @param { OpenAIApi } openai
 */

module.exports = async (client, interaction, openai) => {
  await interaction.deferReply(true);
  const balanceCheck = require("../billing/balanceCheck");
  const isOk = await balanceCheck(interaction);
  console.log(`balance check :: ${isOk}`);
  const userId = interaction.user.id;
  if (isOk == "ok") {
    const prompt = interaction.options.get("prompt").value;

    const messages = [{ role: "user", content: `${prompt}` }];
    try {
      let gptReply = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 500,
        messages: messages,
      });

      const currentDate = new Date();
      const dateCode = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
      userLog.create({
        userId: userId,
        userInput: prompt,
        templateName: "ChatGpt",
        dateCode: dateCode,
      });
      //console.log(gptReply.data.choices[0].text);
      console.log(gptReply.data.choices[0].message.content);
      await interaction.followUp(`${gptReply.data.choices[0].message.content}`);
    } catch (error) {
      await interaction.followUp(`${error}`);
    }
  } else {
    console.log(isOk);
    await interaction.followUp(`${isOk}`);
  }
};
