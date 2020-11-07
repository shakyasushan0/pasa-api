const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
var cookieSession = require("cookie-session");

const cors = require("cors");
const Users = require("./models/users");
const Products = require("./models/products");
const Sellers = require("./models/sellers");
const Orders = require("./models/orders");
const Ads = require("./models/ads");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/UserRouter");
const productRouter = require("./routes/ProductRouter");
const sellerRouter = require("./routes/SellerRouter");
const orderRouter = require("./routes/OrderRouter");
const adsRouter = require("./routes/AdsRouter");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

//db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Sucessfully connected to the db"))
  .catch((err) => console.log(err));

app.set("trust proxy", 1);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//middlewares
app.use(cors());
app.use(express.json());
app.use("/public/images/", express.static("public/images"));

app.use(
  cookieSession({
    name: "session-id",
    secret: process.env.SESSION_SECRET,
  })
);

//routes
app.get("/", (req, res) => {
  res.send("Server is up and running");
});
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/seller", sellerRouter);
app.use("/order", orderRouter);
app.use("/ads", adsRouter);
app.use("/", indexRouter);

//listening to server
app.listen(PORT, () => console.log("Server listening on port " + PORT));
