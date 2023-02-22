module.exports = (io) => {
  let nickNames = [];
  let typingUsers = {};

  io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Usuarios conectados
    socket.on('nuevo usuario', (datos, callback) => {
      if (nickNames.indexOf(datos) != -1) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = datos;
        nickNames.push(socket.nickname);

        io.sockets.emit('nombre usuario', nickNames);
      }
    });

    // Al recibir un mensaje recogemos los datos:
    socket.on('enviar mensaje', (datos) => {
      io.sockets.emit('nuevo mensaje', {
        msg: datos,
        username: socket.nickname,
      });
    });

    // Manejar la desconexión de un usuario
    socket.on('disconnect', () => {
      if (socket.nickname) {
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);
        io.sockets.emit('nombre usuario', nickNames);
        delete typingUsers[socket.nickname];
        io.sockets.emit('escribiendo', typingUsers);
      }
      console.log('Usuario desconectado');
    });

    // Manejar evento 'escribiendo'
    socket.on('escribiendo', () => {
      typingUsers[socket.nickname] = true;
      io.sockets.emit('escribiendo', typingUsers);
    });

    // Manejar evento 'no escribiendo'
    socket.on('no escribiendo', () => {
      delete typingUsers[socket.nickname];
      io.sockets.emit('escribiendo', typingUsers);
    });
    
  });
};
