const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new Schema({
  id: {
    type: ObjectId,
    ref: "User",
  },
  review: String,
  rating: Number,
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [{ type: String, default: null }],
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  subSubCategory:{
    type:String,
    required: true
  },
  brand:{
    type: String,
    required: true
  },
  reviewedBy: [reviewSchema],
  postedBy: {
    type: ObjectId,
    ref: "Seller",
  },
});

const Products = mongoose.model("Product", productSchema);
module.exports = Products;
