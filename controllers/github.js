import passport from 'passport';
import jwt from 'jsonwebtoken';
import constant from '../config/constant.js';
const { JWT_SECRET,ClIEND_URL } = constant;

export const githubLogin =  passport.authenticate('github', { scope: [ 'user:email' ] });

export const githubCallback = (req, res) => {
  passport.authenticate('github', {
    session: false,
  }, (authErr, user, info) => {
    if (authErr || !user) {
      console.log(authErr || "User not found");
      // handle authentication error
      return res.redirect(`${ClIEND_URL}`);
    }
    
    const token = jwt.sign({ id: user.githubId, userId: user._id }, JWT_SECRET);
    res.cookie('token', token, { 
      maxAge: 86400000,
      httpOnly: true, // Secure the cookie
      // other cookie settings if needed
    });
    return res.redirect(`${ClIEND_URL}admin`);
  })(req, res);
};



