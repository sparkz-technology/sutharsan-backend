import axios from 'axios';
import User from '../models/user.js';
import constant from '../config/constant.js';
import jwt from 'jsonwebtoken';

const { github:{clientID,callbackURL,clientSecret},CLIEND_URL,JWT_SECRET} = constant;

export const githubCallback = async(req, res, next) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(code);
    const githubData = await getUserData(accessToken);
    const user = await User.findOne({githubId:githubData.id})
    if(!user){
      res.redirect(`${CLIEND_URL}/error`);
    }
    user.accessToken = accessToken;
    await user.save();
    return  res.redirect(`${CLIEND_URL}/success/${user.accessToken}`);
  } catch (error) {
    next(error);
  }
};

export const githubLogin = async(req, res, next) => {
  try{
    const {accessToken} = req.body;
    console.log(accessToken);
    const user = await User.findOne({accessToken});
    if(!user){
    const error = new Error('You are not authorized to access this route');
    error.statusCode = 404;
    throw error;
    }
    const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:3600});//1 hour
    res.json({token});
  }
  catch(error){
    next(error);
  }
}
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


