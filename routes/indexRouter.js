const express = require("express");
const indexRouter = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Seller = require("../models/sellers");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

indexRouter.get("/reset-password/:token/:expiresIn", (req, res, next) => {
  const token = req.params.token;
  const expiresIn = req.params.expiresIn;
  if (Date.now() < expiresIn) res.render("resetPassword", { token: token });
  else res.render("tokenExpired");
});
indexRouter.post(
  "/reset-password/:token",
  urlencodedParser,
  (req, res, next) => {
    const { password1, password2 } = req.body;
    const token = req.params.token;
    if (password1 != password2) {
      res.send("<h2>Password did not matched!</h2>");
    } else {
      User.findOne({ token })
        .then((user) => {
          bcrypt
            .hash(password1, 12)
            .then((hashedPassword) => {
              user.password = hashedPassword;
              user.save().then((usr) => {
                console.log(usr);
                res.send("<h3>Your password has been reset!</h3>");
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }
);

indexRouter.get(
  "/seller-reset-password/:token/:expiresIn",
  (req, res, next) => {
    const token = req.params.token;
    const expiresIn = req.params.expiresIn;
    if (Date.now() < expiresIn)
      res.render("resetSellerPassword", { token: token });
    else res.render("tokenExpired");
  }
);
indexRouter.post(
  "/seller-reset-password/:token",
  urlencodedParser,
  (req, res, next) => {
    const { password1, password2 } = req.body;
    const token = req.params.token;
    if (password1 != password2) {
      res.send("<h2>Password did not matched!</h2>");
    } else {
      Seller.findOne({ token })
        .then((user) => {
          bcrypt
            .hash(password1, 12)
            .then((hashedPassword) => {
              user.password = hashedPassword;
              user.save().then((usr) => {
                console.log(usr);
                res.send("<h3>Your password has been reset!</h3>");
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }
);

module.exports = indexRouter;
