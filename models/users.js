const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  token: {
    type: String,
  },
  expiresIn: {
    type: Date,
  },
  shippingAddress: [
    {
      region: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  ],
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
