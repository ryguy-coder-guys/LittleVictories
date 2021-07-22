import express from 'express';
import {
  addAchievement,
  addLike,
  removeLike,
  addComment,
  removeComment
} from './../controllers/achievements';

const { Router } = express;
const router = Router();

router.post('/', addAchievement);
router.post('/comment', addComment);
router.delete('/comment/:commentId', removeComment);
router.post('/like', addLike);
router.delete('/like/:userId/:achievementId', removeLike);

export default router;
