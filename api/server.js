import express from 'express';
import router from 'express-enrouten';
import routes from './routes';

const port = process.env.PORT || 3333;

// Setup server
const server = express()
  .use(router(routes))
  .set('port', port)
  .listen(port, (e) => {
    if (e) throw e;
    process.stdout.write('Listening on port: ' + port);
  });


export default server;
