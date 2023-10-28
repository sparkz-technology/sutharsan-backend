import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import constant from './constant.js';
import User from '../models/user.js';

passport.use(
  new GitHubStrategy.Strategy(
    constant.github,
    async (accessToken, refreshToken, profile, done) => {
      try {
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
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

