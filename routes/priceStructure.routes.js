import express from 'express';
import { priceStructure } from '../controllers/priceStructure.controllers.js';

const router = express.Router();

router.post('/', priceStructure);

export default router;
