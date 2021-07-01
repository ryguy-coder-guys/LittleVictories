import express from 'express';
import { addJournalEntry, getJournalEntry, getAllJournals } from '../controllers/journalEntries';

const { Router } = express;
const router = Router();

router.post('/create', addJournalEntry);
router.get('/:user_id/:date', getJournalEntry);
router.get('/user', getAllJournals)

export default router;