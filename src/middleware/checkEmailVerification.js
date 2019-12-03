const User = require("../models/user");

const checkEmailVerification = async (req, res, next) => {
  const { email } = req.body;

  const localUser = await User.findOne({ "local.email": email });

  if (!localUser) {
    return res.status(400).send({ msg: "user not found" });
  }

  if (!localUser.local.emailVerified) {
    return res.status(401).json({ msg: "email is not verified" });
  }


  next();
};
module.exports = { checkEmailVerification };
