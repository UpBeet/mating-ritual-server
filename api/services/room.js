import rooms from '../rooms';
const Emit = rooms.send;

export function create (ws) {
    console.log('create room');
    const res = {
      action: 'ROOM_KEY',
      data: rooms.createRoom(id),
    }

    Emit(ws, res);
};

export function join (key, ws) {
  console.log('join room');
  const res = {
    action: 'JOINED_ROOM',
    data: rooms.joinRoom(key, ws),
  };

  rooms.sendRoom(res, key);
};
