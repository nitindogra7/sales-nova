import express from 'express';
import {
  signUpController,
  refreshTokenController,
} from '../controllers/auth.controllers.js';
import { verifyOtp } from '../controllers/auth.controllers.js';
import { sendOtp } from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', sendOtp);
router.post('/refresh-token', refreshTokenController);

export default router;
