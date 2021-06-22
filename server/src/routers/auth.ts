import express from 'express';
import { loginUser } from '../controllers/auth';

const { Router } = express;
const router = Router();

router.get('/login', loginUser);

export default router;
