const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    userName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("profiles", profileSchema)