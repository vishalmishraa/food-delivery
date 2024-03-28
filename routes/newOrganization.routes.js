import express from 'express';
import { newOrganization } from '../controllers/newOrganization.controllers.js';

const router = express.Router();

router.post('/', newOrganization);

export default router;
