import * as room from './rooms';

export default function (ws) {
  ws.on('message', (msg) => {
    const event = JSON.parse(msg);

    switch(event.action){
      case 'CREATE_ROOM': room.send('ROOM_KEY', room.createRoom(), ws); break;
      case 'JOIN_ROOM': room.sendRoom('JOINED_ROOM', room.joinRoom(event.data, ws), event.data); break;
    }
  });

};
