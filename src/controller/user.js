const bcrypt = require("bcryptjs");
// models
const User = require("../models/user");
const EmailService = require("../helpers/nodemailer");

const { assignToken, verifyToken } = require("../helpers/jwt"); // requiring JWT_function

/*
----- The Signup method down below has email verification functionality -----
*/

// const signUp = async (req, res) => {
//   try {
//     const { name, email, password } = req.user;

//     // checking user in database
//     const isUser = await User.findOne({ "local.email": email });

//     if (!isUser) {
//       // hashing the password
//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(password, salt);

//       // saving user
//       const newUser = new User({
//         method: "local",
//         local: {
//           name,
//           email,
//           password: hashPassword,
//           emailVerified: false,
//         },
//       });

//       const emailToken = Math.floor(Math.random() * 10000) + "_verify"; // uniqe email token

//       newUser.local.emailVerificationToken = emailToken; // assigning unique token

//       const emailTemplate = `<h1> Blogger Site </h1>
//       <p>Welcome ${newUser.local.name} </p>
//       <p> Thank you to sign up to continue please verify you email </p>
//        your token is <h3> ${newUser.local.emailVerificationToken} </h3>
//       `;

//       await EmailService.sendText(
//         newUser.local.email,
//         "Welcome!",
//         "thanks for signup now you are member of blogger_site ",
//         emailTemplate
//       );
//       await newUser.save();
//       const token = assignToken(newUser._id); // assigning JWT_token

//       res.status(200).json({
//         success: true,
//         user: {
//           id: newUser._id,
//           name,
//           email,
//           token,
//         },
//       });
//       // res.status(200).send("signup");
//     } else {
//       res
//         .status(400)
//         .json({ error: true, errorMsg: { msg: "email is already in used" } });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: true, errorMsg: err });
//   }
// };



const signUp = async (req, res) => {
  try {

    const { name, email, password } = req.user;


    // Check if there is user in database 
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
          emailVerified: false,
        },
      });

      await newUser.save();
      const token = assignToken(newUser._id); // assigning JWT_token

      res.status(200).json({
        success: true,
        user: {
          id: newUser._id,
          name,
          email,
          token,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }

}


const signIn = async (req, res) => {
  const token = assignToken(req.user._id);
  console.log(req.user);
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.local.name,
      email: req.user.local.email,
      token,
    },
  });
};

const verifyEmail = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  if (!user) {
    res.json(403).send("user not found");
  }
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
  res.redirect(
    `${process.env.CLIENT_ORIGIN}/emailVerification/${req.user._id}`
  );
};

const secret = async (req, res) => {
  try {
    const data = verifyToken(req.body.token);
    if (!data) res.json({ msg: "token is not valid/expire" });
    const user = await User.findOne({ _id: data.sub });
    res.send({
      success: true,
      user: {
        id: user._id,
        name: user.local.name,
        email: user.local.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { signUp, signIn, verifyEmail, secret, googleVerification };
