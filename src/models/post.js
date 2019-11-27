const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    postAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Posts", PostSchema); 