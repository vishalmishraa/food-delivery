import express from 'express';
import {addItem, getAllItems } from "../controllers/Item.controllers";

const router = express.Router();

router.post('/addItem', addItem);
router.get('/getAllItems', getAllItems);

export default router;