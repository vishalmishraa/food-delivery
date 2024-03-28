import express from 'express';
import { calculatePrice } from '../controllers/calculatePrice.controllers.js';

const router = express.Router();

router.get('/', calculatePrice);

export default router;
