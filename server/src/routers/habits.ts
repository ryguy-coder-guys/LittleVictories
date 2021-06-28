import express from 'express';
import { addHabit } from '../controllers/habits';

const { Router } = express;
const router = Router();

router.post('/', addHabit);

export default router;