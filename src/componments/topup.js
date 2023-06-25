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
      .setURL(`https://daojiemarketing.activehosted.com/f/25/${userId}`)
      .setLabel("buy")
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(paymentLink);

    await interaction.reply({
      content: `make a payment`,
      components: [row],
    });
  },
};
