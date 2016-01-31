import room from './room';

export default function (ws) {
  ws.on('message', (msg) => {
    const event = JSON.parse(msg);

    switch(event.action){
      case 'CREATE_ROOM': room.sendRoom('ROOM_KEY', rooms.createRoom(), res);
      case 'JOIN_ROOM': rooms.sendRoom('JOINED_ROOM', rooms.joinRoom(event.data, ws), key);
    }
  });

};
