const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  citizenshipNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const Sellers = mongoose.model("Seller", sellerSchema);
module.exports = Sellers;
