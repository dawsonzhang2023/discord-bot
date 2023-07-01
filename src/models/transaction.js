const { Schema, model } = require("mongoose");

/**
 *
 */

const TransactionSchema = new Schema(
  {
    _id: String,
    transactionId: String,
    transactionType: String,
    productName: String,
    userId: String,
    transactionAmt: Number,
    transactionDate: Date,
    transactionStatus: String,
    currency: String,
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
