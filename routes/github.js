import express from 'express';
import { githubCallback ,githubLogin} from '../controllers/github.js';

const router = express.Router();
router.post('/github', githubLogin);
router.get('/github/callback', githubCallback);

export default router;
