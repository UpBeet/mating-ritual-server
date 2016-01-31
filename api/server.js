/*
import express from 'express';
import router from 'express-enrouten';
import routes from './routes';
import socketServer from './socketServer';

const port = process.env.PORT || 3333;

// Setup server
const server = express()
  .use(router(routes))
  .set('port', port)
  .listen(port, (e) => {
    if (e) throw e;
    process.stdout.write('Listening on port: ' + port);
  });

socketServer(server);

export default server;
*/

import { Server as WebSocketServer } from 'ws';

const ws = new WebSocketServer({ port: process.env.PORT || 8080 });

ws.on('connection', (socket) => {
  console.log('socket connected');
  socket.on('message', (msg) => {
    console.log(msg.toString());
  });

  socket.send('{ "msg": "THISISALLJOESFAULT" }');
});
