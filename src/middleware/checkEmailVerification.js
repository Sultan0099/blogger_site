const User = require("../models/user");

const checkEmailVerification = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ msg: "user not found" });
  }

  if (!user.emailVerification) {
    return res.status(401).json({ msg: "email is not verified" });
  }

  next();
};
module.exports = { checkEmailVerification };
