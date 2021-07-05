import express from 'express';
import { registerUser, loginUser, users } from '../controllers/auth';

const { Router } = express;
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/logout', logoutUser);
router.get('/users', users)

export default router;
