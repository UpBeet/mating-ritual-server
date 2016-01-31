import R from 'ramda';
import keyGen from 'randomstring';

const rooms = {};

export const genRoomKey = () => {
  return keyGen.generate({
    length: 5,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  });
};

export const createRoom = () => {
  let roomKey = genRoomKey();
  while(rooms[roomKey] !== undefined) {
    roomKey = genRoomKey();
  }

  rooms[roomKey] = [];
  return roomKey;
};

export const joinRoom = (roomKey, socket) => {
  rooms[roomKey].push(socket);
  return rooms[roomKey].length;
};

export const leaveRoom = (roomKey, userKey) => {
  delete rooms[roomKey][userKey];
  return rooms;
};

export const deleteRoom = (roomKey) => {
  delete rooms[roomKey];
  return rooms;
};

export const send = (action, data, ws) => {
  ws.send(JSON.stringify({ action, data }));
  return msg;
};

export const sendRoom = (action, data, roomKey) => {
  const sendMsg = R.curry(this.send, msg);
  R.map(sendMsg, rooms[roomKey]);
  return rooms;
};
