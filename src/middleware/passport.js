const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");
const { googleClientId, clientSecret, urlCallBack } = require("../config/keys"); // obtaining key from config/key
const EmailService = require("../helpers/nodemailer");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ "local.email": email }); // findig user from database

        if (!user) {
          return done(null, false);
        } else {
          const validPassword = await user.isValidPassword(password); // matching password
          console.log(!validPassword);
          if (!validPassword) {
            return done(null, false);
          }

          return done(null, user); // returning user to passport
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// google oauth 20 strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: clientSecret,
      callbackURL: urlCallBack
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        // console.log("profile", profile);

        // Checking existing user
        const isUser = await User.findOne({ "google.googleId": profile.id });
        const localUser = await User.findOne({
          "local.email": profile.emails[0].value
        });

        if (!isUser && !localUser) {
          const newUser = new User({
            method: "google",
            google: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile._json.picture,
              emailVerified: false
            }
          });
          const emailToken = Math.floor(Math.random() * 10000) + "_verify"; // unique email token

          newUser.google.emailVerificationToken = emailToken; // assigning unique token

          const emailTemplate = `<h1> Blogger Site </h1>
          <p>Welcome ${newUser.google.name} </p>
          <p> Thank you to sign up to continue please verify you email </p>
           your token is <h3> ${newUser.google.emailVerificationToken} </h3>
          `;

          await EmailService.sendText(
            newUser.google.email,
            "Welcome!",
            "thanks for signup now you are member of blogger_site ",
            emailTemplate
          );
          const user = await newUser.save();
          return done(null, user);
        } else {
          return done(null, isUser);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});
