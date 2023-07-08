// 1117607555234013254
const userLogRepository = require("../models/userLog");

/**
 *
 * @param {import("discord.js").Interaction} interaction
 */

const noChargedChannels = ["1117607555234013254", "1111320055846797383"];

exports.noChargeCheck = async (interaction) => {
  if (
    interaction.channelId &&
    noChargedChannels.includes(interaction.channelId)
  ) {
    const userId = interaction.user.id;
    const dailyMax = 3;
    const currentDate = new Date();
    console.log(currentDate);

    // output  date

    const dateCode = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    console.log(dateCode);
    const userLogs = await userLogRepository.find({
      userId: userId,
      dateCode: dateCode,
      chargeType: "CAL_FREE",
    });

    if (userLogs && userLogs.length >= dailyMax) {
      return { isOk: false, errMsg: `over daily usage number ${dailyMax}` };
    } else {
      return { isOk: true, chargeType: "CAL_FREE" };
    }
  }
};
