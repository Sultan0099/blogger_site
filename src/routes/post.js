const express = require("express");
const router = express.Router();

const { uploadFiles, createPost, getPosts } = require("../controller/post");

const { checkUserAuth } = require("../middleware/auth_middlware");
const { postValidator } = require("../middleware/validators");

router.post("/uploadFiles", checkUserAuth, uploadFiles);

router.post("/create", checkUserAuth, postValidator, createPost);

router.get('/posts', checkUserAuth, getPosts)

module.exports = router;
