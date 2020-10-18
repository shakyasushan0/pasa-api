const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const User = require("../models/users");
const authenticate = require("../authenticate");
const userRouter = express.Router();

const sendMail = (recipient, code) => {
  var options = {
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  };
  var mailer = nodemailer.createTransport(sendgrid(options));
  var email = {
    to: recipient,
    from: "no-reply@getnada.com",
    subject: "Verification Code",
    html: `
    <h1>PASA</h1>
   <p>Your Verification Code is ${code}
    `,
  };
  mailer.sendMail(email);
};

userRouter.post("/signup", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.json({
          status: 403,
          message: `User with email ${email} already exists !`,
        });
      } else {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            code: Math.floor(Math.random() * (9999 - 1111) + 1111),
          })
            .save()
            .then((newUser) => {
              sendMail(newUser.email, newUser.code);
              return res.status(200).json({
                user: newUser,
                status: 200,
                message: "Registered Successfully !",
              });
            })
            .catch((err) => res.send(err));
        });
      }
    })
    .catch((err) => console.log(err));
});

userRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((matchedUser) => {
          if (matchedUser) {
            req.session.user = user;
            res.status(200).json({
              status: 200,
              message: "You are succesfully logged in !",
            });
          } else {
            res.status(401).json({
              status: 401,
              message: "Invalid Password !",
            });
          }
        });
      } else {
        res.status(404).json({
          status: 404,
          message: `User with email ${email} doesnot exists !`,
        });
      }
    })
    .catch((err) => console.log(err));
});

userRouter.get("/isAuthenticated", (req, res) => {
  if (req.session.user) {
    res.json({
      message: "You are authenticated",
      status: 200,
      user: req.session.user,
    });
  } else {
    res.json({
      status: 403,
      user: null,
      message: "You are not authenticated!",
    });
  }
});
userRouter.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session = null;
    //res.clearCookie("session-id");
    res.send("You are logged out !");
  } else {
    res.send("you are not logged in !");
  }
});
userRouter.post("/verifyUser", (req, res) => {
  const { id } = req.body;
  // User.findById(id)
  //   .then((user) => {
  //     if (user) {
  //       req.session.user = user;
  //       res.status(200).json({ status: 200, message: "Success !" });
  //     }
  //   })
  //   .catch((err) => console.log(err));
  User.findByIdAndUpdate(id, { $set: { verified: true } }, { new: true }).then(
    (user) => {
      req.session.user = user;
      res.status(200).json({ status: 200, message: "Success !" });
    }
  );
});
userRouter.put("/addShippingAddress",authenticate,(req,res) => {
  const {region,city,area,address} = req.body;
  const shippingAddress = {
    region,
    city,
    area,
    address
  }
  User.findByIdAndUpdate(req.session.user._id,{$push:{shippingAddress : shippingAddress}},{new:true})
  .then(user=>{
    res.status(200).json({status : 200 , message : "Succesfully added !"})
  }).catch(err=>res.json({message:err.message}))
})
module.exports = userRouter;
