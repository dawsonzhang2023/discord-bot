/**
 *
 * @param {import("discord.js").Interaction} interaction
 */

const subscribeRepository = require("../models/userSubscribe");
const userLogRepository = require("../models/userLog");

module.exports = async (interaction) => {
  const userId = interaction.user.id;

  console.log(interaction.user);
  let userSubscribes = await subscribeRepository.find({
    status: "OPEN",
    userId: userId,
  });

  const currentDate = new Date();
  console.log(currentDate);

  // output  date

  const dateCode = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  console.log(dateCode);
  console.log(userSubscribes);
  // if current date is in range of service subscribe
  // find limit for day
  if (userSubscribes && userSubscribes.length) {
    let maxlimit = 0;
    for (let userSub of userSubscribes) {
      if (userSub.productName == "test-7-bot") {
        const plimit = 5;
        if (plimit > maxlimit) maxlimit = plimit;
      }
      if (userSub.productName == "test-25-bot") {
        const plimit = 50;
        if (plimit > maxlimit) maxlimit = plimit;
      }
    }

    console.log(` user id :::  ${userId}  daily limit : ${maxlimit}`);

    // check if out daily usage
    const userLogs = await userLogRepository.find({
      userId: userId,
      dateCode: dateCode,
      chargeType: "SUBSCRIBE",
    });

    if (userLogs && userLogs.length >= maxlimit) {
      return { isOk: false, errMsg: `over daily usage number ${maxlimit}` };
    } else {
      return { isOk: true, chargeType: "SUBSCRIBE" };
    }
  } else {
    console.log("no subscribe");
    return { isOk: false, errMsg: `no subscribe`, errCode: "no_subscribe" };
  }
};
