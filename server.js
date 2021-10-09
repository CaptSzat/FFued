'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = '/public/';

const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  // .get('/public', function(req, res) {
  //   res.sendFile('index.html', { root: __dirname })
  // })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('data', (data) => {
    console.log("data");
    console.log(data);
    io.emit('data', data)});
  socket.on('joined', () => io.emit('connect'));
  // io.emit('connect', () => console.log('Client connect ping sent'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
