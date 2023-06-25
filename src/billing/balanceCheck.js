/**
 *
 * @param {import("discord.js").Interaction} interaction
 */

const discordUser = require("../models/discordsUser");
const product = require("../models/product");

module.exports = async (interaction) => {
  const userId = interaction.user.id;
};
