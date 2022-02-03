const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const PORT = process.env.PORT || 9999
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("connect_room", (data) => {
    socket.join(data);
    console.log(`User with ID ${socket.id} connected to ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("Message", data, socket.id);
    socket.to(data.roomID).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Server has been started");
});
