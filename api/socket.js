import * as RoomService from './services/room';

const Emit = (res, ws) => ws.send(JSON.stringify(res));

export default function (ws) {
  ws.on('message', (msg) => {
    const event = JSON.parse(msg);

    switch(event.action){
      case 'CREATE_ROOM': RoomService.create(ws); break;
    }
  });
};
