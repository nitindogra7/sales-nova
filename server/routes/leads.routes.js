import express from 'express';
import {
  createLeadsController,
  getLeadsController,
  getSingleLeadController,
} from '../controllers/leads.controllers.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import { createLeadsMiddleware } from '../middlewares/leads.middleware.js';
import allowRoles from '../middlewares/roles.middleware.js';

const router = express.Router();

router.post('/leads', createLeadsMiddleware, createLeadsController);

router.get('/leads', authMiddleware, allowRoles('owner'), getLeadsController);

router.get(
  '/leads/:id',
  authMiddleware,
  allowRoles('owner'),
  getSingleLeadController
);

export default router;
