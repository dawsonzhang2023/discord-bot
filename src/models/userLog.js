const { Schema, model } = require("mongoose");

const userLogSchema = new Schema(
  {
    userId: String,
    userInput: String,
    templateName: String,
    dateCode: String,
  },
  { timestamps: true }
);

module.exports = model("UserLog", userLogSchema);
