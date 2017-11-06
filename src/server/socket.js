export default function(socket) {
  socket.on('ping', (data) => {
      socket.emit('pong', data);
    })
  });
};
