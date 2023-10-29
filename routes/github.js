import express from 'express';
import { githubCallback } from '../controllers/github.js';

const router = express.Router();

router.get('/github/callback', githubCallback);

export default router;
