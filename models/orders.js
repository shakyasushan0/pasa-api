const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: String,
      required: true,
    },
    deliveredDate: {
      type: String,
    },
  },
  { timestamps: true }
);
const Orders = mongoose.model("Order", orderSchema);
module.exports = Orders;
