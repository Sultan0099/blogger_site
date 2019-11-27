const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerification: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("Users", userSchema);
