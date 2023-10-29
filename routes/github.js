import express from 'express';
import { githubLogin, githubCallback } from '../controllers/github.js';
import constant from '../config/constant.js';
const { CLIEND_URL } = constant;

const router = express.Router();

router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);
router.get('/github/success', (req, res) => {
  res.redirect(`${CLIEND_URL}admin`);
});

export default router;
