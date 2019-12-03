const bcrypt = require("bcryptjs");

// models
const User = require("../models/user");
const EmailService = require("../helpers/nodemailer");

const { assignToken } = require("../helpers/jwt"); // requiring JWT_funciton

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.user;

    // checking user in database
    const isUser = await User.findOne({ "local.email": email });

    if (!isUser) {
      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // saving user
      const newUser = new User({
        method: "local",
        local: {
          name,
          email,
          password: hashPassword,
          emailVerified: false
        }
      });

      const emailToken = Math.floor(Math.random() * 10000) + "_verify"; // uniqe email token

      newUser.local.emailVerificationToken = emailToken; // assigning unique token



      const emailTemplate = `<h1> Blogger Site </h1>
      <p>Welcome ${newUser.local.name} </p>
      <p> Thank you to sign up to continue please verify you email </p>
       your token is <h3> ${newUser.local.emailVerificationToken} </h3>
      `;

      await EmailService.sendText(
        newUser.local.email,
        "Welcome!",
        "thanks for signup now you are member of blogger_site ",
        emailTemplate
      );
      await newUser.save();
      // const token = assignToken(user._id); // assigning JWT_token
      // res.status(200).json({ token });
      res.status(200).send("Please check your email");
    } else {
      res.status(400).json({ msg: "email is already in used" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error in server");
  }
};

const signIn = async (req, res) => {
  const token = assignToken(req.user._id);

  res.status(200).json({ token });
};

const verifyEmail = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  if (user.method === "local") {
    if (user.local.emailVerificationToken === req.body.token) {
      user.local.emailVerificationToken = "";
      user.local.emailVerified = true;
      console.log(req.params._id);
      await user.save();
      return res.status(200).json({ msg: "your email is verified" });
    } else {
      if (user.local.emailVerification) {
        return res.status(200).json({ msg: "your email is already verified" });
      }
      return res.status(400).json({ msg: "put the right Token" });
    }
  }
  if (user.method === "google") {
    if (user.google.emailVerificationToken === req.body.token) {
      user.google.emailVerificationToken = "";
      user.google.emailVerified = true;
      console.log(req.params._id);
      await user.save();
      return res.status(200).json({ msg: "your email is verified" });
    } else {
      if (user.google.emailVerification) {
        return res.status(200).json({ msg: "your email is already verified" });
      }
      return res.status(400).json({ msg: "put the right Token" });
    }
  }

};

const googleVerification = async (req, res) => {
  res.send("token in future");
};

const secret = async (req, res) => {
  res.send("hello from sercret");
};

module.exports = { signUp, signIn, verifyEmail, secret, googleVerification };
