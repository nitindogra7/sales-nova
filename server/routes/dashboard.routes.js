import express from 'express';
import { getDashboard } from '../controllers/dashboard.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, getDashboard);

export default router;
