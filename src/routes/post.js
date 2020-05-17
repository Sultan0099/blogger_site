const express = require("express");
const router = express.Router();

const { uploadFiles, createPost, getPosts, singlePost } = require("../controller/post");

const { checkUserAuth } = require("../middleware/auth_middlware");
const { postValidator } = require("../middleware/validators");

router.post("/uploadFiles", checkUserAuth, uploadFiles);

router.post("/create", checkUserAuth, postValidator, createPost);

router.get('/posts', checkUserAuth, getPosts)

router.post("/singlePost", checkUserAuth, singlePost)

module.exports = router;
