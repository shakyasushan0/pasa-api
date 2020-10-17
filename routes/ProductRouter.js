const express = require("express");
const products = require("../models/products");
const router = express.Router();
const authenticate = require("../authenticate");
const Products = require("../models/products");

router
  .route("/")
  .get((req, res) => {
    products
      .find({})
      .populate("reviewedBy", "firstName lastName")
      .populate("postedBy", "fullName citizenshipNumber")
      .then((product) => {
        if (product) {
          res.status(200).json({ product });
        } else {
          res.json({
            message: "There are no any products",
          });
        }
      })
      .catch((err) => console.log(err));
  })
  .post(authenticate, (req, res) => {
    const {
      name,
      unitPrice,
      discount,
      description,
      image,
      category,
      subCategory,
      subSubCategory,
      brand
    } = req.body;
    new Products({
      name,
      unitPrice,
      discount,
      description,
      image,
      category,
      subCategory,
      subSubCategory,
      brand,
      postedBy: req.session.user,
    })
      .save()
      .then((product) => {
        res.status(200).json({
          status: 200,
          message: "Succesfully posted",
          product,
        });
      })
      .catch((err) => res.json({ message: err, status: 422 }));
  });
router.route("/:productId").delete(authenticate, (req, res) => {
  Products.findByIdAndRemove(req.params.productId)
    .then((result) => res.json({ message: "succesfully deleted" }))
    .catch((err) => console.log(err));
});
module.exports = router;
