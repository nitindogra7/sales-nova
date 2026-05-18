import express from 'express';
import { signUpController } from '../controllers/auth.controllers.js';
import { verifyOtp } from '../controllers/auth.controllers.js';
import { sendOtp } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', sendOtp);

export default router;
