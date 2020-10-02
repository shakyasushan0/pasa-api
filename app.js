const express = require("express");
const mongoose = require("mongoose");

var cookieSession = require("cookie-session");

const cors = require("cors");
const Users = require("./models/users");
const userRouter = require("./routes/UserRouter");
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

//listening to server
app.listen(PORT, () => console.log("Server listening on port " + PORT));
