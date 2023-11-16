const http = require("http");
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({});
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //video chat
  console.log("emitting " + socket.id);
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    console.log(
      "call to " + data.userToCall + " from " + data.from + " is made"
    );
    io.to(data.userToCall).emit("callUser", {
      //emit the callUser event with the signal and the socketId of the caller
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("answerCall", (data) => {
    //emit a callAccepted event to the
    io.to(data.to).emit("callAccepted", data.signal);
  });
  

  socket.on("send_id", (data) => {
    socket.to(data.roomId).emit("receive_id", data.id);
  });

  //chat room
  socket.on("join_room", (data) => {
    console.log("joining room " + data);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
  });

  
  //question exchange
  socket.on("question", (data) => {
    socket.to(data.roomId).emit("question", data.question);
  });

  //language change
  socket.on("language", (data) => {
    console.log("language change to " + data.language);
    socket.to(data.roomId).emit("language", data.language);
  });
});

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});
