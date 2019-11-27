const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../helpers/passport"); // require strategies

const userController = require("../controller/user");
const { signUpValidator, signInValidator } = require("../helpers/validator");

router.post("/signup", signUpValidator, userController.signUp);

router.post(
  "/signin",
  signInValidator,
  passport.authenticate("local", { session: false }),
  userController.signIn
);

router.post("/verifyEmail/:_id", userController.verifyEmail);

router.post("/secret", userController.secret);

module.exports = router;
