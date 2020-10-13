const express = require("express");
const Orders = require("../models/orders");
const orderRouter = express.Router();
const authenticate = require("../authenticate");
orderRouter.post("/", authenticate, (req, res) => {
  const {
    productName,
    productId,
    totalPrice,
    shippingAddress,
    quantity,
  } = req.body;
  new Orders({
    productName,
    productId,
    totalPrice,
    shippingAddress,
    quantity,
    orderedBy: req.session.user,
  })
    .save()
    .then((order) => {
      res
        .status(200)
        .json({ message: "Your order has been succesfully posted" });
    })
    .catch((err) => res.send(err));
});
orderRouter.get("/", authenticate, (req, res) => {
  Orders.find({})
    .populate("orderedBy", "firstName lastName email phone email")
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else res.status(400).json({ message: "No orders yet!" });
    })
    .catch((err) => res.send(err));
});
module.exports = orderRouter;
