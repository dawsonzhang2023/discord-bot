const twitter_template = require("../templates/twitter-t");
/**
 *
 * @param {Interaction} action
 * @param {OpenAIApi} openai
 */

module.exports = async (action, openai) => {
  const shareInfo = action.options.get("share_information").value;
  const target = action.options.get("target").value;
  const brand = action.options.get("brand").value;
  const experts = action.options.get("experts").value;

  console.log(`user input ${shareInfo} ,  ${target} ,  ${brand} , ${experts} `);

  const prompt = twitter_template(shareInfo, target, brand, experts);

  await action.deferReply(true);
  let gptReply = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 500,
    stop: ["ChatGPT"],
  });
  //action.deferReply(`${gptReply.data.choices[0].text}`);
  // action.editReply(`${gptReply.data.choices[0].text}`);
  await action.followUp(`${gptReply.data.choices[0].text}`);

  action.reply(prompt);
};
