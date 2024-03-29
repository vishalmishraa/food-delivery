import express from 'express';
import { getAllPricing, priceStructure } from '../controllers/priceStructure.controllers';

const router = express.Router();

router.post('/addPricing', priceStructure);
router.get('/getAllPricing', getAllPricing);


export default router;
