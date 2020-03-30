const User = require("../models/user");

const checkEmailVerification = async (req, res, next) => {
  const { email } = req.body;

  const localUser = await User.findOne({ "local.email": email });
  const googleUser = await User.findOne({ "google.email": email });
  if (!localUser || !googleUser) {
    return res.status(400).send({ msg: "user not found" });
  }

  if (!localUser.local.emailVerified || !googleUser.google.emailVerified) {
    return res.status(401).json({
      msg: "email is not verified",
      link: "http://localhost:3001/emailverification"
    });
  }

  next();
};
module.exports = { checkEmailVerification };
