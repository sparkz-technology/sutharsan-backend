import axios from 'axios';
import User from '../models/user.js';
import constant from '../config/constant.js';
const { github:{clientID,callbackURL,clientSecret},CLIEND_URL} = constant;

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
    res.cookie('token',user.accessToken,{maxAge: 1000 * 60 * 60 * 24 * 30,httpOnly: true,signed: true,});
    return  res.redirect(`${CLIEND_URL}/success/${user.accessToken}`);
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


