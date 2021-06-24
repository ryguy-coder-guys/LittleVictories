import express from 'express';
import { removeJournalEntry, addJournalEntry, getJournalEntry } from '../controllers/journalEntries';

const { Router } = express;
const router = Router();

router.post('/create', addJournalEntry);
router.get('/:user_id/:date', getJournalEntry);
router.post('/delete', removeJournalEntry);

export default router;