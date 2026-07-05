import express from 'express';
import {
  createLeadsController,
  getLeadsController,
  getSingleLeadController,
  updateLeadController,
  deleteLeadController,
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

router.patch(
  '/leads/:id',
  authMiddleware,
  allowRoles('owner'),
  updateLeadController
);

router.delete(
  '/leads/:id',
  authMiddleware,
  allowRoles('owner'),
  deleteLeadController
);

export default router;
