const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }); // findig user from database

        if (!user) {
          return done(null, false);
        } else {
          const validPassword = await user.isValidPassword(password); // matching password
          console.log(!validPassword);
          if (!validPassword) {
            return done(null, false);
          }

          return done(null, user); // returnig user to passport
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
