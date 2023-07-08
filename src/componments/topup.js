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

    // check if it is private session
    if (interaction.guildId && interaction.member) {
      interaction.reply(`请与DAO-BOT 单独会话，确保你的客户服务的私密安全`);
    } else {
      const paymentLink = new ButtonBuilder()
        .setURL(
          `https://daojiemarketing.thrivecart.com/test-7-bot/?passthrough[custom_discord_userid]=${userId}`
        )
        .setLabel("每日5条订阅")
        .setStyle(ButtonStyle.Link);

      // https://daojiemarketing.activehosted.com/f/25?discord_ID=<975859028154535976 这个是变量是用户的ID >
      const signOffLink = new ButtonBuilder()
        .setURL(
          `https://daojiemarketing.activehosted.com/f/25?discord_ID=${userId}`
        )
        .setLabel("签到")
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder().addComponents([
        signOffLink,
        paymentLink,
      ]);

      await interaction.reply({
        content: `客户服务`,
        components: [row],
      });
    }
  },

  async executePayNotice(interaction) {
    const userId = interaction.user.id;

    console.log("top up userId :: " + userId);

    const paymentLink = new ButtonBuilder()
      .setURL(
        `https://daojiemarketing.thrivecart.com/test-7-bot/?passthrough[custom_discord_userid]=${userId}`
      )
      .setLabel("每日5条订阅")
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder().addComponents(paymentLink);

    await interaction.reply({
      content: `没有订阅任何产品，请完成一个订阅`,
      components: [row],
    });
  },
};
