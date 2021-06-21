import app from './app';
import { dbConnection } from './database';

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`little victories server listening on port ${PORT}`)
);
