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

  rooms[roomKey] = {
    currentJudge: 0,
    users: [],
    dances: [],
  };
  return roomKey;
};

export const joinRoom = (roomKey, socket) => {
  console.log('JOIN ROOM');
  rooms[roomKey].users.push(socket);
  return rooms[roomKey].users.length;
};

export const leaveRoom = (roomKey, userKey) => {
  delete rooms[roomKey].users[userKey];
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
// what should this return
export const storeDance = (roomKey, userKey, dance) => {
  const currRoom = rooms[roomKey];
  currRoom.dances[userKey] = dance;
  if( currRoom.dances.length === currRoom.users.length )
    return true;
  else
    return false;
};

export const getAllDances = (roomKey) => {
  return rooms[roomKey].dances;
};

export const sendRoom = (action, data, roomKey) => {
  console.log('action: ' + action);
  const sendMsg = R.curry(send, action, data);
  R.map(sendMsg, rooms[roomKey].users);
  return rooms;
};
