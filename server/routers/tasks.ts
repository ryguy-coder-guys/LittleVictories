import express from 'express';
import {
  getTasks,
  addTask,
  removeTask,
  markTaskAsComplete,
  markTaskAsIncomplete,
} from '../controllers/tasks';

const { Router } = express;
const router = Router();

router.get('/', getTasks);

router.post('/', addTask);

router.delete('/:id', removeTask);

router.patch('/:id/complete', markTaskAsComplete);

router.patch('/:id/incomplete', markTaskAsIncomplete);

export default router;
