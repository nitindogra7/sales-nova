import express from 'express';
import { getWorkspace } from '../controllers/workspace.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import allowRoles from '../middlewares/roles.middleware.js';
import { generateApi } from '../controllers/workspace.controllers.js';
import { getApiKey } from '../controllers/workspace.controllers.js';

const router = express.Router();

router.get('/workspace', authMiddleware, allowRoles('owner'), getWorkspace);
router.post('/generate-api', authMiddleware, allowRoles('owner'), generateApi);
router.get('/get-apiKey', authMiddleware, allowRoles('owner'), getApiKey);

export default router;
