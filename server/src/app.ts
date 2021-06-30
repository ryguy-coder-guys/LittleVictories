import express from 'express';
import taskRouter from './routers/tasks';
import listRouter from './routers/lists';
import authRouter from './routers/auth';
import journalEntryRouter from './routers/journalEntry';
import statRouter from './routers/stats';
import habitRouter from './routers/habits';
import likeRouter from './routers/likes';
import commentRouter from './routers/comments';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', taskRouter);
app.use('/api/lists', listRouter);
app.use('/api/auth', authRouter);
app.use('/api/journalEntries', journalEntryRouter);
app.use('/api/stats', statRouter);
app.use('/api/habits', habitRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);

export default app;
