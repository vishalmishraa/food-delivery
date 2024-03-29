import express from 'express';
import { calculateCost } from '../controllers/cost.controllers';

const router = express.Router();

router.post('/calculateCost', calculateCost);

export default router;
