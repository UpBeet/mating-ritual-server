export default (socket) => {
  // Attach all the god damn handlers
  console.log(socket);
  socket.emit('test', 'you connected');
};
