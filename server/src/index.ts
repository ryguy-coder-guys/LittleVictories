import { dbConnection } from './database';
import httpServer from './websocket';

dbConnection
  .sync()
  .then(() => {
    console.log('little victories database successfully synced');
    const PORT = 3000;
    httpServer.listen(PORT, () =>
      console.log(`little victories server listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log('little victories database unsuccessfully synced');
    console.log(err);
  });
