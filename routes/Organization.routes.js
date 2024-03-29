import express from 'express';
import { getAllOrganization, newOrganization } from '../controllers/Organization.controllers.js';

const router = express.Router();

router.post('/newOrganization', newOrganization);
router.get('/getOrganization', getAllOrganization);

export default router;
