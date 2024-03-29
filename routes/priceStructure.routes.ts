import express from 'express';
import { priceStructure } from '../controllers/priceStructure.controllers';

const router = express.Router();

router.post('/', priceStructure);

export default router;
