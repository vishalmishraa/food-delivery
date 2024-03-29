import express from 'express';
import { calculatePrice } from '../controllers/calculatePrice.controllers';

const router = express.Router();

router.post('/', calculatePrice);

export default router;
