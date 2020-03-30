require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// keys from config/keys.js

const { mongoUri, cookieSecret } = require("./config/keys");

// Database

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database is connected"))
  .catch(err => console.log({ err }));

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieSecret]
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

app.get("/", (req, res) => {
  res.send(" hello world ");
});

app.get("/emailVerification", (req, res) => {
  res.send("email verification");
});
// routes
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/post", require("./routes/post"));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
