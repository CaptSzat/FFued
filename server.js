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

var store = {
  teamA: 0,
  teamB: 0,
  currentScore: 0,
  wrong: 0,
  question: "Get Ready!",
  nameA: "A",
  nameB: "B",
  a1: {
    answer: "a1",
    points: 0,
    show: false
  },
  a2: {
    answer: "a2",
    points: 0,
    show: false
  },
  a3: {
    answer: "a3",
    points: 0,
    show: false
  },
  a4: {
    answer: "a4",
    points: 0,
    show: false
  },
  a5: {
    answer: "a5",
    points: 0,
    show: false
  },
  a6: {
    answer: "a6",
    points: 0,
    show: false,
    hide: false
  },
};

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('data', (data) => {
    console.log("data");
    store = data;
    console.log(data);
    io.emit('data', store)});
  socket.on('joined', () => io.emit('connect', store));
  // io.emit('connect', () => console.log('Client connect ping sent'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
