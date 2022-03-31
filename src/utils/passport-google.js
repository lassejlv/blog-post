const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const moment = require("moment");

const User = require("../database/models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const newUser = {
        userId: profile.id,
        name: profile.displayName,
      };

      try {
        let user = await User.findOne({ userId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
