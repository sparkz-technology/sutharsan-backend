import passport from 'passport';
import jwt from 'jsonwebtoken';
import constant from '../config/constant.js';
const { JWT_SECRET } = constant;

export const githubLogin =  passport.authenticate('github', { scope: [ 'user:email' ] });

export const githubCallback = (req, res) => {
  passport.authenticate('github', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:5173/admin',
    session: false,
  }, (authErr, user, info) => {
    if (authErr) {
      // handle authentication error
      return res.redirect('/'); // Redirect to an error page or homepage
    }
    
    const token = jwt.sign({ id: user.githubId ,userId:user._id}, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { maxAge: 86400000 });
    return res.redirect('http://localhost:5173/admin');
  })(req, res);
};


