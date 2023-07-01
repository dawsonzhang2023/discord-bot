const { mongoose, Schema, model } = require("mongoose");
const transaction = require("../../models/transaction");
const subscribe = require("../../models/userSubscribe");
require("dotenv").config();

const main = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log("connet to mongo");
  });

  let trans = await transaction.find({});

  console.log(trans);

  let userSubscribe = await subscribe.find({ status: "OPEN" });

  console.log(userSubscribe.length);

  mongoose.disconnect();
};

main();
