import room from './rooms';

export default function (ws) {
  ws.on('message', (msg) => {
    const event = JSON.parse(msg);

    switch(event.action){
      case 'CREATE_ROOM': room.sendRoom('ROOM_KEY', room.createRoom(), res);
      case 'JOIN_ROOM': rooms.sendRoom('JOINED_ROOM', room.joinRoom(event.data, ws), key);
    }
  });

};
