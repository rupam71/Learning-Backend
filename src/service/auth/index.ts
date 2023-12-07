import express, { Router } from 'express';
import * as Controller from './controller';
import { verifyToken } from './middleware/varifyToken';

const router: Router = express.Router();

router.post('/signup', Controller.signUp);
router.post('/login', Controller.login);
router.get('/me', verifyToken, Controller.me);
router.post('/regenerateToken', Controller.regenerateToken);

export default router;