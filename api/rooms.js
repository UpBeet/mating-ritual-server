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
  console.log('CREATE ROOM');
  let roomKey = genRoomKey();
  while(rooms[roomKey] !== undefined) {
    roomKey = genRoomKey();
  }

  rooms[roomKey] = [];
  return roomKey;
};

export const joinRoom = (roomKey, socket) => {
  console.log('JOIN ROOM');
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
  const msg = JSON.stringify({ action, data });
  console.log(msg);
  ws.send(msg);
};

export const sendRoom = (action, data, roomKey) => {
  console.log('action: ' + action);
  const sendMsg = R.curry(send, action, data);
  R.map(sendMsg, rooms[roomKey]);
  return rooms;
};
