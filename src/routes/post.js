const express = require("express");
const router = express.Router();

const Post = require("../models/post");

const { checkUserAuth } = require("../middleware/auth_middlware");

router.post("/create", checkUserAuth, async (req, res) => {
  //   const newPost = new Post({
  //     title: "hello",
  //     description: "hello world",
  //     body: "<h1> Hello world </h1>"
  //   });

  //   await newPost.save();

  res.send(" POST routes");
});

router.get("/", async (req, res) => {
  const allPost = await Post.find({});

  res.send({ post: allPost });
});
module.exports = router;
