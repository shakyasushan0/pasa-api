const express = require("express");
const mongoose = require("mongoose");

var cookieSession = require("cookie-session");

const cors = require("cors");
const Users = require("./models/users");
const Products = require("./models/products");
const Sellers = require("./models/sellers");
const Orders = require("./models/orders");
const userRouter = require("./routes/UserRouter");
const productRouter = require("./routes/ProductRouter");
const sellerRouter = require("./routes/SellerRouter");
const orderRouter = require("./routes/OrderRouter");
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
//middlewares
app.use(cors());
app.use(express.json());

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

//listening to server
app.listen(PORT, () => console.log("Server listening on port " + PORT));
