const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../middleware/passport"); // require passport strategies

const userController = require("../controller/user"); // Controllers

const {
  signUpValidator,
  signInValidator,
} = require("../middleware/validators");
const {
  checkEmailVerification,
} = require("../middleware/checkEmailVerification");

router.post("/signup", signUpValidator, userController.signUp);

router.post(
  "/signin",
  signInValidator,
  passport.authenticate("local", { session: false }),
  userController.signIn
);

router.post("/verifyEmail/:_id", userController.verifyEmail);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  userController.googleVerification
);

router.post("/secret", userController.secret);

module.exports = router;
