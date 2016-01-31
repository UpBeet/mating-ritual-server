import R from 'ramda';
import keyGen from 'randomstring';

const rooms = {};

const room = {
  genRoomKey: () => {
    return keyGen.generate({
      length: 5,
      charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
  },
  createRoom: () => {
    let roomKey = this.genRoomKey();
    while(rooms[roomKey] !== undefined) {
      roomKey = this.genRoomKey();
    }

    rooms[roomKey] = [];
    return roomKey;
  },
  joinRoom: (roomKey, socket) => {
    rooms[roomKey].push(socket);
    return rooms[roomKey].length;
  },
  leaveRoom: (roomKey, userKey) => {
    delete rooms[roomKey][userKey];
    return rooms;
  },
  deleteRoom: (roomKey) => {
    delete rooms[roomKey];
    return rooms;
  },
  send: (action, data, ws) => {
    ws.send(JSON.stringify({ action, data }));
    return msg;
  },
  sendRoom: (action, data, roomKey) => {
    const sendMsg = R.curry(this.send, msg);
    R.map(sendMsg, rooms[roomKey]);
    return rooms;
  },
};

export default room;
