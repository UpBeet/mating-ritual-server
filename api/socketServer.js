import Server from 'socket.io';
import Socket from './socket';

export default (app) => {
  const io = new Server(app);

  io.on('connection', (socket) => Socket(socket));
};
