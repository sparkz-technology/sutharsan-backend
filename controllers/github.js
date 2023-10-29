// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import constant from '../config/constant.js';
// const { JWT_SECRET,CLIEND_URL } = constant;
// export const githubLogin =  passport.authenticate('github', { scope: [ 'user:email' ] });

// export const githubCallback = (req, res, next) => {
//   passport.authenticate('github', {
//     failureRedirect: `${CLIEND_URL}login`,
//     successRedirect: `${CLIEND_URL}admin`,
//     session: false }, async (err, user) => {
//     if (err) {
//       return next(err);
        
//     }
//     if (!user) {
//       return res.redirect(`${CLIEND_URL}login`);
//     }
//     const token =  jwt.sign({ id: user.githubId, userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
//     res.cookie('token', token, { maxAge: 86400000 });
//     return res.redirect(`${CLIEND_URL}admin`);
//   })(req, res, next);
// };


import passport from 'passport';
import jwt from 'jsonwebtoken';
import constant from '../config/constant.js';
const { JWT_SECRET, CLIENT_URL } = constant;

export const githubLogin = passport.authenticate('github', { scope: ['user:email'] });

export const githubCallback = (req, res, next) => {
  passport.authenticate('github', { session: false }, async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(`${CLIENT_URL}login`);
    }
    
    try {
      const token = jwt.sign({ id: user.githubId, userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, { maxAge: 86400000 });
      return res.redirect(`${CLIENT_URL}admin`);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
