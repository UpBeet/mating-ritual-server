import R from 'ramda';

const rooms = {};

export default {
  createRoom: (roomKey) => {
    if (rooms[roomKey]) throw new Error('Room already exists');
    rooms[roomKey] = {};
    return rooms;
  },
  joinRoom: (roomKey, userKey, socket) => {
    rooms[roomKey][userKey] = socket;
    return rooms;
  },
  leaveRoom: (roomKey, userKey) => {
    delete rooms[roomKey][userKey];
    return rooms;
  },
  deleteRoom: (roomKey) => {
    delete rooms[roomKey];
    return rooms;
  },
  send: (msg, ws) => {
    ws.send(JSON.stringify(msg));
    return msg;
  },
  sendRoom: (msg, roomKey) => {
    const sendMsg = R.curry(this.send, msg);
    R.map(sendMsg, rooms[roomKey]);
    return rooms;
  },
};
