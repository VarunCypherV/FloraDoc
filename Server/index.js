
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ExpressPeerServer } = require("peer");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // Broadcast the message to everyone in the room including the sender
    io.to(data.room).emit("receive_message", { message: data.message, senderId: socket.id });
  });
  

  socket.on('join-audio-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined audio room: ${roomId}`);
  });

  socket.on('leave-audio-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User left audio room: ${roomId}`);
  });

  socket.on('audio-stream', (data) => {
    io.to(data.room).emit('audio-stream', data.audioData);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
