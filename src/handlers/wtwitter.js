const twitter_template = require("../templates/twitter-t");

const userLog = require("../models/userLog");
const dateUtil = require("../utils/dateUtil");
/**
 *
 * @param {Interaction} action
 * @param {OpenAIApi} openai
 */

module.exports = async (action, openai) => {
  const shareInfo = action.options.get("share_information")?.value;
  const target = action.options.get("target")?.value;
  const brand = action.options.get("brand")?.value;
  const experts = action.options.get("experts")?.value;

  console.log(`user input ${shareInfo} ,  ${target} ,  ${brand} , ${experts} `);

  const prompt = twitter_template(shareInfo, target, brand, experts);
  let paramInput = `${shareInfo} ,  ${target} ,  ${brand} , ${experts}`;
  await action.deferReply(true);
  const messages = [{ role: "user", content: `${prompt}` }];
  let gptReply = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    max_tokens: 500,
    messages: messages,
  });
  const userId = interaction.user.id;
  const dateCode = dateUtil.getCurrentDateCode();
  userLog.create({
    userId: userId,
    userInput: paramInput,
    templateName: "twitter",
    dateCode: dateCode,
    chargeType: action.chargeType,
  });
  await action.followUp(`${gptReply.data.choices[0].message.content}`);
};
