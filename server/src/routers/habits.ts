import express from 'express';
import { addHabit, removeHabit } from '../controllers/habits';

const { Router } = express;
const router = Router();

router.post('/', addHabit);
router.delete('/:id', removeHabit);

export default router;