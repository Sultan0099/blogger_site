const Post = require("../models/post");
const upload = require("../config/multer");

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
    const posts = await Post.find({});
    console.log(posts)
    res.status(200).json({ success: true, data: posts })
  } catch (err) {
    res.status(400).json({ success: false, err })
  }
}

module.exports = { uploadFiles, createPost, getPosts };
