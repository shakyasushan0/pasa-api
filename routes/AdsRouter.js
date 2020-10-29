const express = require("express");
const multer = require("multer");
const authenticate = require("../authenticate");
const ads = require("../models/ads");
const adsRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(new Error("Only image files!"), false);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

adsRouter.post("/postAds", authenticate, upload.single("image"), (req, res) => {
  const { banner, title, paid, duration, price } = req.body;
  new ads({
    banner: req.file.path,
    title,
    paid,
    duration,
    postedBy: req.session.user,
    price,
  })
    .save()
    .then((ad) => {
      res.status(200).json({
        status: 200,
        message: "Ads request posted succesfully",
      });
    })
    .catch((err) => res.json(err));
});

adsRouter.get("/", (req, res) => {
  ads
    .find({})
    .populate("postedBy", "fullName email phone")
    .then((ad) => {
      if (ad) {
        res.status(200).json({
          ads: ad,
          status: 200,
        });
      } else {
        res.json({
          message: "No ads are posted yet...",
        });
      }
    })
    .catch((err) => res.json(err));
});
module.exports = adsRouter;
