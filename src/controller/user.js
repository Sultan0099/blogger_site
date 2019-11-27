const bcrypt = require("bcryptjs");

// models
const User = require("../models/user");
const EmailService = require("../helpers/nodemailer");

const { assignToken } = require("../helpers/jwt"); // requiring JWT_funciton

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.user;

    // checking user in database
    const isUser = await User.findOne({ email });

    if (!isUser) {
      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // saving user
      const newUser = new User({
        name,
        email,
        password: hashPassword
      });

      const emailToken = Math.floor(Math.random() * 10000) + "_verify";

      newUser.emailVerificationToken = emailToken; // assigning unique token

      const user = await newUser.save();

      const emailTemplate = `<h1> Blogger Site </h1>
      <p>Welcome ${user.name} </p>
      <p> Thank you to sign up to continue please verify you email </p>
       your token is <h3> ${user.emailVerificationToken} </h3>
      `;

      const info = await EmailService.sendText(
        email,
        "Welcome!",
        "thanks for signup now you are member of blogger_site ",
        emailTemplate
      );

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

  if (!req.user.emailVerification) {
    return res.json({ msg: "email is not verified" });
  }
  res.status(200).json({ token });
};

const verifyEmail = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });

  if (user.emailVerificationToken === req.body.token) {
    user.emailVerificationToken = "";
    user.emailVerification = true;
    console.log(req.params._id);
    await user.save();
    return res.json({ msg: "your email is verified" });
  } else {
    if (user.emailVerification) {
      return res.status(200).json({ msg: "your email is already verified" });
    }
    return res.status(400).json({ msg: "put the right Token" });
  }
};

const secret = async (req, res) => {
  res.send("hello from sercret");
};

module.exports = { signUp, signIn, verifyEmail, secret };
