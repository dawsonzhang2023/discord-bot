const twitter_template = require("../templates/twitter-t");
/**
 *
 * @param {Interaction} action
 * @param {OpenAIApi} openai
 */

module.exports = (action, openai) => {
  const shareInfo = action.options.get("share_information").value;
  const target = action.options.get("target").value;
  const brand = action.options.get("brand").value;
  const experts = action.options.get("experts").value;

  console.log(`user input ${shareInfo} ,  ${target} ,  ${brand} , ${experts} `);

  const prompt = twitter_template(shareInfo, target, brand, experts);

  action.reply(prompt);
};
