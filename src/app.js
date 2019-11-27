require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// keys from config/keys.js

const { mongoUri } = require("./config/keys");

// Databse

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Datebase is connected"))
  .catch(err => console.log({ err }));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(" hello world ");
});

// routes
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/post", require("./routes/post"));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
