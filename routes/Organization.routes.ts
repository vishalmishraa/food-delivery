import express from 'express';
import { getAllOrganization, newOrganization } from '../controllers/Organization.controllers';

const router = express.Router();

router.post('/newOrganization', newOrganization);
router.get('/getAllOrganization', getAllOrganization);

export default router;
