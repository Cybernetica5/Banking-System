import express from 'express';
import { money_transfer } from '../services/MoneyTransfer/money-transfer.js';

const router = express.Router();

router.post('/api/money-transfer', money_transfer);

export default router;
