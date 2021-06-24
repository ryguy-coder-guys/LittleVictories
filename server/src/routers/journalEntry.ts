import express from 'express';
import { removeJournalEntry, addJournalEntry } from '../controllers/journalEntries';

const { Router } = express;
const router = Router();

router.post('/create', addJournalEntry);
router.post('/delete', removeJournalEntry);

export default router;
