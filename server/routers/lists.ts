import express from 'express';
import { addList, removeList } from '../controllers/lists';

const { Router } = express;
const router = Router();

router.post('/', addList);

router.delete('/:id', removeList);

export default router;
