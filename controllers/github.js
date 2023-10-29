import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/user.js';
import constant from '../config/constant.js';
const { github:{clientID,callbackURL,clientSecret},CLIEND_URL,JWT_SECRET} = constant;

export const githubCallback = async(req, res, next) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(code);
    const githubData = await getUserData(accessToken);
    let user = await User.findOne({ githubId: githubData.id });
    if(!user){
      const error = new Error('You are not authorized to access this page');
      error.status = 401;
      return next(error);
    }
  
    return  res.redirect("success");
  } catch (error) {
    next(error);
  }
};
async function getAccessToken(code) {
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientID,
    client_secret: clientSecret,
    code,
    redirect_uri: callbackURL,
  }, {
    headers: { 'Accept': 'application/json' }
  });
  return response.data.access_token;
}

async function getUserData(accessToken) {
  const response = await axios.get('https://api.github.com/user', {
    headers: { 'Authorization': `token ${accessToken}` }
  });
  return response.data;
}



