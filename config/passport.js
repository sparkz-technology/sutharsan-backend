import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import constant from './constant.js';
import User from '../models/user.js';

const { github:{callbackURL,clientID,clientSecret} } = constant;

passport.use(
  new GitHubStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
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
