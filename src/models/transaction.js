const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
  {
    _id: String,
    transactionId: String,
    transactionType: String,
    productName: String,
    userId: String,
    transactionAmt: Number,
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
