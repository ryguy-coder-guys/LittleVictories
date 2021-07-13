import express from 'express';
import { addAchievement } from './../controllers/achievements';

const { Router } = express;
const router = Router();

router.post('/', addAchievement);

export default router;
