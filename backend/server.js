const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let counter = 0;

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    counter++;
    io.emit('receive_message', { ...data, message: counter });
  });
});

server.listen(8003, () => {
  console.log('SERVER IS RUNNING');
});
