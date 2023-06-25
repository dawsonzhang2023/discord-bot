const { Schema, model } = require("mongoose");

const userLogSchema = new Schema({
  userLogId: String,
  userId: String,
  transactionId: String,
  useAmt: Number,
  currentBalance: Number,
  privousBalance: Number,
  templateName: String,
  inputParams: String,
  resultContent: String,
});

module.exports = model("UserLog", userLogSchema);
