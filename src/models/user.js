const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },

  local: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    emailVerified: {
      type: Boolean
    },
    emailVerificationToken: {
      type: String
    }
  },
  google: {
    googleId: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    email: {
      type: String
    },
    emailVerificationToken: {
      type: String
    },
    emailVerified: {
      type: Boolean,
    }
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("users", userSchema);
