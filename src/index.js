const express = require('express');
const path =  require('path');

const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io')(server);

// Middleware body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/mi_evento', (req, res) => {
  console.log('Evento recibido:', req.body);
  res.send('Evento recibido');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.set('port', process.env.PORT || 3000);

require('./sockets')(socketio);

//Archivo estatico
app.use(express.static(path.join(__dirname, 'public')))

server.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto',app.get('port'));
  });
  