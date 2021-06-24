import { JournalEntry } from '../database/models/journalEntry';
import { RequestHandler } from 'express';
import { AddJournalEntryReqBody } from '../interfaces/journalEntries';

export const getJournalEntries: RequestHandler = async (req, res) => {
  const journalEntries = await JournalEntry.findAll();
  res.send(journalEntries);
};

export const addJournalEntry: RequestHandler = async (req, res) => {
  const {
    user_id,
    content
  } = req.body as AddJournalEntryReqBody;

  console.log('THIS!', req.body, user_id, content);

  try {
    const newJournalEntry = await JournalEntry.create({
      user_id,
      content
    });
    console.log('entry successfully submitted');
    res.status(201).send(newJournalEntry);
  } catch (err) {
    console.log('entry submission error', err.message);
    res.sendStatus(500);
  }
};

// remove journal entry
export const removeJournalEntry: RequestHandler<{ id: number }> = async (req, res) => {
  const { id } = req.params;
  await JournalEntry.destroy({ where: { id } });
  res.send(`journal entry with id of ${id} has been removed from db`);
};

// remove all journal entries
