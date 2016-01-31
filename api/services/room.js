import shortid from 'shortid';

const Emit = (ws, res) => ws.send(JSON.stringify(res));

export function create (ws) {
    console.log('create room');
    const res = {
      action: 'ROOM_KEY',
      data: shortid.generate(),
    }

    Emit(ws, res);
};
