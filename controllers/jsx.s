const express = require('express');
const axios = require('axios');

const app = express();
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';

app.get('/auth/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(code);
    const userData = await getUserData(accessToken);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getAccessToken(code) {
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
