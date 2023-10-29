import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import constant from './constant.js';
import User from '../models/user.js';

passport.use(
  new GitHubStrategy(
    {
      clientID: 'be5a9847d65b1697867d',
      clientSecret: 'c4659c3c1d48741b6713be5cd775412a685a8007',
      callbackURL: 'http://localhost:8000/auth/github/callback',
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) {
          return done(null, false, { message: 'You are not authorized to access this page' });
        }

        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
        return done(null, false, { message: 'You are not authorized to access this page' });
        }

        done(null, user);
      } catch (err) {
        console.error('GitHub authentication error:', err);
        done(err);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
