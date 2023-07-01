const {
  ButtonBuilder,
  ButtonStyle,
  Interaction,
  SlashCommandBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  // data: new SlashCommandBuilder()...

  /**
   *
   * @param {Interaction} interaction
   */

  async execute(interaction) {
    const userId = interaction.user.id;

    console.log("top up userId :: " + userId);

    const paymentLink = new ButtonBuilder()
      .setURL(
        `https://daojiemarketing.thrivecart.com/test-7-bot/?passthrough[custom_discord_userid]=${userId}`
      )
      .setLabel("buy")
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(paymentLink);

    await interaction.reply({
      content: `make a payment`,
      components: [row],
    });
  },

  async executePayNotice(interaction) {
    const userId = interaction.user.id;

    console.log("top up userId :: " + userId);

    const paymentLink = new ButtonBuilder()
      .setURL(
        `https://daojiemarketing.thrivecart.com/test-7-bot/?passthrough[custom_discord_userid]=${userId}`
      )
      .setLabel("buy")
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(paymentLink);

    await interaction.reply({
      content: `没有订阅任何产品，请完成一个订阅`,
      components: [row],
    });
  },
};
