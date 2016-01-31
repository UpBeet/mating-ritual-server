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
    winners: [],
    dances: [],
  };
  return roomKey;
};

export const users = (key) => rooms[key].users

export const joinRoom = (roomKey, socket) => {
  console.log('JOIN ROOM');

  if (rooms[roomKey] === undefined) return -1;

  rooms[roomKey].users.push(socket);
  rooms[roomKey].winners.push(0);
  return rooms[roomKey].users.length - 1;
};

export const resetRoom = (roomKey) => {
  R.map((x) => { return 0; }, rooms[roomKey].winners);
  rooms[roomKey].dances = [];
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

export const dances = (key) => rooms[key].dances
// what should this return
export const storeDance = (roomKey, userKey, dance) => {
  dances(roomKey)[userKey] = dance;
  if( dances(roomKey).length >= users(roomKey).length - 1 )
    return true;
  else
    return false;
};

export const getAllDances = (roomKey) => {
  return rooms[roomKey].dances;
};

export const sendRoom = (action, data, roomKey) => {
  console.log('action: ' + action);
  users(roomKey).map((u) => send(action, data, u));

  return rooms;
};

export const getStats = (roomKey) => rooms[roomKey].winners

export const getJudge = (roomKey) => (rooms[roomKey].currentJudge++) % users(roomKey).length

export const selectWinner = (roomKey, userId) => {
  rooms[roomKey].winners[userId]++
  rooms[roomKey].dances = [];
};
