const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../middleware/passport"); // require passport strategies

const userController = require("../controller/user");
const { signUpValidator, signInValidator } = require("../middleware/validator");
const {
  checkEmailVerification
} = require("../middleware/checkEmailVerification");

router.post("/signup", signUpValidator, userController.signUp);

router.post(
  "/signin",
  signInValidator,
  checkEmailVerification,
  passport.authenticate("local", { session: false }),
  userController.signIn
);

router.post("/verifyEmail/:_id", userController.verifyEmail);

router.post("/secret", userController.secret);

module.exports = router;
