import * as room from './rooms';

const Emit = room.send;
const EmitRoom = room.sendRoom;

export default function (ws) {
  ws.on('message', (msg) => {
    const { action, roomKey, data } = JSON.parse(msg);
    console.log('recieved: ' + msg);

    switch(action){
      case 'CREATE_ROOM': Emit('ROOM_KEY', room.createRoom(), ws); break;

      case 'JOIN_ROOM': EmitRoom('JOINED_ROOM', room.joinRoom(roomKey, ws), roomKey); break;

      case 'BEGIN': EmitRoom('BEGIN', room.getJudge(roomKey), roomKey); break;

      case 'SEND_PROMPT': EmitRoom('GET_PROMPT', data, roomKey); break;

      case 'SEND_DANCE':
        if (!room.storeDance(data)) {
          Emit('DANCE_RECEIVED', {}, ws);
        } else {
          EmitRoom('START_JUDGING', room.getAllDances(key));
        }
        break;

      case 'PICK_WINNER':
        if (room.selectWinner(roomKey, data) >= 3) {
          EmitRoom('GAME_WINNER', data, roomKey);
        } else {
          EmitRoom('ROUND_WINNER', data, roomKey);
        }

        break;

      case 'GAME_STATE': Emit('GAME_STATE', room.getStats(roomKey), ws); break;
      case 'PLAY_AGAIN': room.resetRoom(roomKey); EmitRoom('BEGIN', room.getJudge(roomKey), roomKey); break;
    }
  });

};
