import express from 'express';
import { githubCallback } from '../controllers/github.js';
import constant from '../config/constant.js';
const {CLIEND_URL} = constant;

const router = express.Router();

router.get('/github/callback', githubCallback);
router.get('/github/success', (req, res, next) => {
  res.cookie('token', "token");
  res.redirect(CLIEND_URL);
  
 });

export default router;
