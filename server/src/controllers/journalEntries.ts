import { JournalEntry } from '../database/models/journalEntry';
import { RequestHandler } from 'express';
import { AddJournalEntryReqBody } from '../interfaces/journalEntries';

export const getJournalEntry: RequestHandler<{user_id: string, date: string}> = async (req, res) => {
  const {
    user_id,
    date
  } = req.params;
  console.log(req.params);
  try {
    const journalEntry = await JournalEntry.findOne({ where: { date: date, user_id: user_id } });
    res.status(200).send(journalEntry);
  } catch (err) {
    console.log('error fetching journal Entry', err.message);
    res.sendStatus(500);
  }
};

export const addJournalEntry: RequestHandler = async (req, res) => {
  const {
    user_id,
    content,
    date
  } = req.body as AddJournalEntryReqBody;

  // check for already existing journalEntry
  const journalEntry = await JournalEntry.findOne({ where: { date: date } });
  // if it exists, edit the existing one's content
  if (journalEntry) {
    const updatedEntry = await journalEntry.update({ content: content });
    res.sendStatus(201).send(updatedEntry);
  } else {
    // if it does not, create it
    try {
      const newJournalEntry = await JournalEntry.create({
        user_id,
        content,
        date
      });
      console.log('entry successfully submitted');
      res.status(201).send(newJournalEntry);
    } catch (err) {
      console.log('entry submission error', err.message);
      res.sendStatus(500);
    }
  }
};

// remove all journal entries
