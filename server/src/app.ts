import express from 'express';
import taskRouter from './routers/tasks';
import listRouter from './routers/lists';
import authRouter from './routers/auth';
import journalEntryRouter from './routers/journalEntry';
import statRouter from './routers/stats';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', taskRouter);
app.use('/api/lists', listRouter);
app.use('/api/auth', authRouter);
app.use('/api/journalEntries', journalEntryRouter);
app.use('/api/stats', statRouter);

export default app;
