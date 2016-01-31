import * as room from './rooms';

const Emit = room.send;
const EmitRoom = room.sendRoom;

export default function (ws) {
  ws.on('message', (msg) => {
    const { action, roomKey, data } = JSON.parse(msg);

    switch(action){
      case 'CREATE_ROOM': Emit('ROOM_KEY', room.createRoom(), ws); break;

      case 'JOIN_ROOM': EmitRoom('JOINED_ROOM', room.joinRoom(roomKey, ws), roomKey); break;

    //  case 'BEGIN': EmitRoom('BEGIN', game.getJudge(roomKey), roomKey); break;

      case 'SEND_PROMPT': EmitRoom('GET_PROMPT', data, roomKey); break;
/*
      case 'SEND_DANCE':
        if (!game.storeDance(data)) {
          Emit('DANCE_STORED', {}, ws);
        } else {
          EmitRoom('START_JUDGING', game.getAll);
        }
        break;
*/
      case 'PICK_WINNER': EmitRoom('ROUND_WINNER', data, roomKey); break;
    }
  });

};
