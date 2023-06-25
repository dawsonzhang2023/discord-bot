const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  _id: String,
  productName: String,
  productId: String,
  productType: String,
  productDesc: String,
  productPrice: Number,
  subscribeType: String,
});

module.exports = model("Product", productSchema);
