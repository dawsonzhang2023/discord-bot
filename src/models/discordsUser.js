const { Schema, model } = require("mongoose");
const transaction = require("./transaction");
const product = require("./product");
const userLog = require("./userLog");

const subscribeSchema = new Schema({
  _id: String,
  productId: String,
  subscribeDate: Date,
  expiredDate: Date,
  subscribeStatus: String,
});

const discordUserSchema = new Schema(
  {
    _id: String,
    userId: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      required: false,
    },
    balance: Number,
    userStatus: String,
    transactions: [String],
    subscribes: [subscribeSchema],
  },
  { timestamps: true }
);

module.exports = model("User", discordUserSchema);
