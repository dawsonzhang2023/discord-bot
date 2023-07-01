const { Schema, model } = require("mongoose");

/**
 *
 */

const userSubcribeSchema = new Schema(
  {
    _id: String,
    userId: String,
    status: String,
    productName: String,
    transactionId: String,
    sub_end: Date,
    sub_start: Date,
  },
  { timestamps: true }
);

module.exports = model(
  "discord-user-subscribe",
  userSubcribeSchema,
  "discord-user-subscribe"
);
