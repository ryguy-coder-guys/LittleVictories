import express from 'express';
import { registerUser, loginUser } from '../controllers/auth';

const { Router } = express;
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/logout', logoutUser);

export default router;
