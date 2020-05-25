const Post = require("../models/post");
const User = require("../models/user");
const upload = require("../config/multer");
const JWT = require("jsonwebtoken");
const secret = require("../config/keys").jwtSecret;

const uploadFiles = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, msg: err });

    console.log(req.hostname);
    const { path, filename } = req.file;

    return res.json({
      success: true,
      data: {
        url: `http://localhost:3001/uploads/${filename}`,
        name: filename,
      },
    });
  });
};

const createPost = async (req, res) => {
  try {
    console.log(req.body);

    const { title, body, writer } = req.body;

    const newPost = new Post({
      title,
      body,
      writer
    });

    await newPost.save();
    res.status(200).json({ success: true, data: { ...newPost._doc } });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "Error in creating Post please try again ",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const token = req.token;
    const payload = await JWT.verify(token, secret);
    console.log(payload)
    const posts = await Post.find({ writer: payload.sub });
    console.log(posts)
    res.status(200).json({ success: true, data: posts })
  } catch (err) {
    res.status(400).json({ success: false, err })
  }
}

const singlePost = async (req, res) => {
  try {
    let post = {};
    const { postId } = req.body;
    console.log(postId)
    const fetchedPost = await Post.findOne({ _id: req.body.postId });
    if (!post) {
      return res.status(200).json({ success: true, data: "post not found" })
    }

    const fetchedWriter = await User.findOne({ _id: fetchedPost._doc.writer });

    const { _doc: { local: { name, email }, _id } } = fetchedWriter

    post = { ...fetchedPost._doc, writer: { name, email, _id } }


    res.status(200).json({ success: true, data: post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error })
  }
}


module.exports = { uploadFiles, createPost, getPosts, singlePost };
