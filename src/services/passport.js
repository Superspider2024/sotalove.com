const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
const User = require("../models/user.js");
require("dotenv").config()

passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "https://sotalove.up.railway.app/auth/instagram/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ instagramId: profile.id });

        if (!user) {
          user = await User.create({
            instagramId: profile.id,
            username: profile.username,
            profilePic: profile._json.profile_picture,
            accessToken,
            refreshToken
          });
        }
        await user.save()
        return done(null, user,{newUser:true});
      } catch (err) {
        return done(err, null);
      }
    }
  )
);



module.exports = passport;
