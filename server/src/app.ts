import express from 'express';
import taskRouter from './routers/tasks';
import listRouter from './routers/lists';
import authRouter from './routers/auth';

// import session from 'express-session';
// import passport from 'passport';
// import passportConfig from './helpers/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: 'our little secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passportConfig);

app.use('/api/tasks', taskRouter);
app.use('/api/lists', listRouter);
app.use('/api/auth', authRouter);

export default app;
