import express from 'express';
import { addJournalEntry, getJournalEntry } from '../controllers/journalEntries';

const { Router } = express;
const router = Router();

router.post('/create', addJournalEntry);
router.get('/:user_id/:date', getJournalEntry);

export default router;